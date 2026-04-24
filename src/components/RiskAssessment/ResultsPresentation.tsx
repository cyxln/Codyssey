export type RiskAssessmentResult = {
  score: number;
  score_description:
    | "MINIMAL_RISK"
    | "LOW_RISK"
    | "MODERATE_RISK"
    | "HIGH_RISK"
    | "SEVERE_RISK";
  location_overview: string;
  vulnerabilities: string;
  precautionary_steps: string[];
  is_area_allowed_to_visit: "YES" | "REROUTE" | "AVOID";
  sources?: string[];
};

export type GroundingChunk = {
  web?: {
    uri?: string;
    title?: string;
  };
  maps?: {
    uri?: string;
    title?: string;
    placeId?: string;
  };
};

export type GroundingSupport = {
  segment?: {
    startIndex?: number;
    endIndex?: number;
    text?: string;
  };
  groundingChunkIndices?: number[];
};

export type SearchGroundingMetadata = {
  webSearchQueries?: string[];
  searchEntryPoint?: {
    renderedContent?: string;
  };
  groundingChunks?: GroundingChunk[];
  groundingSupports?: GroundingSupport[];
};

export type MapsGroundingMetadata = {
  groundingChunks?: GroundingChunk[];
  groundingSupports?: GroundingSupport[];
  googleMapsWidgetContextToken?: string;
};

type ResultsPresentationProps = {
  result: RiskAssessmentResult;
  searchGrounding?: SearchGroundingMetadata;
  mapsGrounding?: MapsGroundingMetadata;
};

const cardBaseClass =
  "rounded-[26px] border border-black/25 bg-white p-5 shadow-[0_16px_35px_rgba(0,0,0,0.08)]";
const cardTitleClass =
  "text-xs font-semibold uppercase tracking-[0.12em] text-[#5f5f5f]";

const getAdaptiveTextClass = (
  content: string,
  options?: { short?: number; long?: number }
) => {
  const shortLimit = options?.short ?? 140;
  const longLimit = options?.long ?? 360;
  const length = content.trim().length;

  if (!length) {
    return "text-sm leading-relaxed";
  }
  if (length <= shortLimit) {
    return "text-base leading-relaxed";
  }
  if (length <= longLimit) {
    return "text-sm leading-relaxed";
  }
  return "text-xs leading-relaxed";
};

function formatEnum(value: string) {
  return value.replaceAll("_", " ");
}

function MetricCard({
  title,
  value,
  className,
  valueClassName,
}: {
  title: string;
  value: string | number;
  className: string;
  valueClassName: string;
}) {
  return (
    <div className={`${cardBaseClass} ${className}`}>
      <p className={cardTitleClass}>{title}</p>
      <p className={`mt-3 font-semibold ${valueClassName}`}>{value}</p>
    </div>
  );
}

function TextCard({
  title,
  text,
  adaptiveLimits,
}: {
  title: string;
  text: string;
  adaptiveLimits?: { short?: number; long?: number };
}) {
  return (
    <div className={cardBaseClass}>
      <p className={cardTitleClass}>{title}</p>
      <p
        className={`mt-3 text-[#1f1f1f] ${getAdaptiveTextClass(
          text,
          adaptiveLimits
        )}`}
      >
        {text}
      </p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={cardBaseClass}>
      <p className={cardTitleClass}>{title}</p>
      <ul
        className={`mt-3 list-disc space-y-2 pl-5 text-[#1f1f1f] ${getAdaptiveTextClass(
          items.join(" "),
          { short: 200, long: 520 }
        )}`}
      >
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function uniqueWebSources(chunks: GroundingChunk[] | undefined) {
  const seen = new Set<string>();
  return (chunks ?? []).flatMap((chunk, index) => {
    const uri = chunk.web?.uri;
    if (!uri || seen.has(uri)) {
      return [];
    }

    seen.add(uri);
    return [
      {
        index: index + 1,
        title: chunk.web?.title || uri,
        uri,
      },
    ];
  });
}

function uniqueMapSources(chunks: GroundingChunk[] | undefined) {
  const seen = new Set<string>();
  return (chunks ?? []).flatMap((chunk, index) => {
    const uri = chunk.maps?.uri;
    if (!uri || seen.has(uri)) {
      return [];
    }

    seen.add(uri);
    return [
      {
        index: index + 1,
        title: chunk.maps?.title || uri,
        uri,
        placeId: chunk.maps?.placeId,
      },
    ];
  });
}

function SourcesCard({
  fallbackSources,
  searchGrounding,
}: {
  fallbackSources: string[];
  searchGrounding?: SearchGroundingMetadata;
}) {
  const renderedContent = searchGrounding?.searchEntryPoint?.renderedContent;
  const webSources = uniqueWebSources(searchGrounding?.groundingChunks);
  const hasGroundedSources = webSources.length > 0;

  return (
    <div className={cardBaseClass}>
      <p className={cardTitleClass}>Sources</p>
      {renderedContent ? (
        <div
          className="mt-3 overflow-hidden rounded-xl border border-black/10 bg-white"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      ) : null}
      {hasGroundedSources ? (
        <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#1f1f1f]">
          {webSources.map((source) => (
            <li key={source.uri} className="flex gap-3">
              <span className="shrink-0 font-semibold text-[#3b76ff]">
                [{source.index}]
              </span>
              <a
                className="break-words underline decoration-black/30 underline-offset-4 transition hover:text-[#3b76ff]"
                href={source.uri}
                rel="noreferrer"
                target="_blank"
              >
                {source.title}
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <ul
          className={`mt-3 list-disc space-y-2 pl-5 text-[#1f1f1f] ${getAdaptiveTextClass(
            fallbackSources.join(" "),
            { short: 160, long: 460 }
          )}`}
        >
          {fallbackSources.length > 0 ? (
            fallbackSources.map((source, index) => (
              <li key={`${source}-${index}`}>{source}</li>
            ))
          ) : (
            <li>No sources provided.</li>
          )}
        </ul>
      )}
    </div>
  );
}

function LocationSourcesCard({
  mapsGrounding,
}: {
  mapsGrounding?: MapsGroundingMetadata;
}) {
  const mapSources = uniqueMapSources(mapsGrounding?.groundingChunks);

  if (mapSources.length === 0) {
    return null;
  }

  return (
    <div className={cardBaseClass}>
      <p className={cardTitleClass}>Location sources</p>
      <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#1f1f1f]">
        {mapSources.map((source) => (
          <li key={source.uri} className="flex gap-3">
            <span className="shrink-0 font-semibold text-[#16833a]">
              [{source.index}]
            </span>
            <div className="min-w-0">
              <a
                className="break-words underline decoration-black/30 underline-offset-4 transition hover:text-[#16833a]"
                href={source.uri}
                rel="noreferrer"
                target="_blank"
              >
                {source.title}
              </a>
              <p className="mt-1 text-xs text-[#5e5e5e]">
                Source: <span translate="no">Google Maps</span>
                {source.placeId ? ` · ${source.placeId}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ResultsPresentation({
  result,
  searchGrounding,
  mapsGrounding,
}: ResultsPresentationProps) {
  return (
    <div className="risk-result mt-6 w-full text-left">
      <div className="grid gap-4 md:grid-cols-[minmax(190px,240px)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <MetricCard
            className="bg-[#e2eefb]"
            title="Risk score"
            value={result.score}
            valueClassName="text-[clamp(2.2rem,3.4vw,3.2rem)] text-[#0f1c2b]"
          />
          <MetricCard
            className="bg-[#f7cdb3]"
            title="Risk level"
            value={formatEnum(result.score_description)}
            valueClassName="text-[clamp(1.4rem,2.4vw,2rem)] text-[#3c2418]"
          />
          <MetricCard
            className="bg-[#c9f4cd]"
            title="Route guidance"
            value={formatEnum(result.is_area_allowed_to_visit)}
            valueClassName="text-[clamp(1.1rem,2vw,1.45rem)] text-[#1f3b27]"
          />
        </div>
        <TextCard
          adaptiveLimits={{ short: 120, long: 360 }}
          text={result.location_overview}
          title="Location overview"
        />
        <TextCard
          adaptiveLimits={{ short: 140, long: 420 }}
          text={result.vulnerabilities}
          title="Vulnerabilities"
        />
      </div>
      <div className="mt-4 grid gap-4">
        <ListCard
          items={result.precautionary_steps}
          title="Precautionary / Next steps"
        />
        <SourcesCard
          fallbackSources={result.sources ?? []}
          searchGrounding={searchGrounding}
        />
        <LocationSourcesCard mapsGrounding={mapsGrounding} />
      </div>
    </div>
  );
}
