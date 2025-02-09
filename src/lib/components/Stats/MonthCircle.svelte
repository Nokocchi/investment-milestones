<script module lang="ts">
  export enum CircleType {
    MONTHS,
    PERCENT,
  }
</script>

<script lang="ts">
    import { range } from "../../shared/utils";



  const {
    value,
    type,
    title,
  }: {
    value: number | null;
    type: CircleType;
    title: string;
  } = $props();

  const lineWidth = 30;
  const bgColor = "black";
  const textColor = "yellow";
  const textStyle = "font: bold 4rem Helvetica, Arial, sans-serif;";
  const textPercent = "font: bold 5rem Helvetica, Arial, sans-serif;";
  const svgSize = "100%";
  const radius = 175;
  const segmentDividerSize = 10;
  const valueNotNull = value === null ? 0 : value;

  // When working with months, each segment is one month. But when working with percentage, each segment is 10%. 
  const adjustedValue = type === CircleType.MONTHS ? valueNotNull : valueNotNull / 10;
  const segments = type === CircleType.MONTHS ? 12 : 10;

  const lastSegmentCompletionDecimals = adjustedValue % 1;
  const numberOfCompletedSegments = Math.floor(adjustedValue);
  const circumference = Math.PI * 2 * radius;
  const segmentSize = circumference / segments - segmentDividerSize;
  const segmentSizeDegrees = (segmentSize / circumference) * 360;
  const segmentDividerDegrees = (segmentDividerSize / circumference) * 360;

  const getRotationOfSegment = (segmentNumber: number): number => {
    return (segmentSizeDegrees + segmentDividerDegrees) * segmentNumber;
  };

  const getDashArray = (segmentNumber: number): string => {
    const segmentFilledRatio = segmentNumber == numberOfCompletedSegments ? lastSegmentCompletionDecimals : 1;
    const dash0 = segmentSize * segmentFilledRatio + segmentDividerSize;
    const dash1 = circumference - (segmentSize * segmentFilledRatio + segmentDividerSize);
    return dash0 + " " + dash1;
  };
</script>

{title}
<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
  <circle stroke={bgColor} cx={radius} cy={radius} r={radius} stroke-width={lineWidth} fill="none" />
  {#each range(segments) as segmentNumber}
    {#if segmentNumber < adjustedValue}
      <circle
        stroke="hsl({(120 / segments) * segmentNumber}, 100%, 50%)"
        transform="rotate({getRotationOfSegment(segmentNumber) - 90} 175 175)"
        cx={radius}
        cy={radius}
        r={radius}
        stroke-dasharray={getDashArray(segmentNumber)}
        stroke-width={lineWidth}
        stroke-dashoffset={0}
        fill="none"
      />
    {/if}
    <circle
      stroke="hsl(200, 100%, 50%)"
      transform="rotate({getRotationOfSegment(segmentNumber) - 90} 175 175)"
      cx={radius}
      cy={radius}
      r={radius}
      stroke-dasharray="{segmentDividerSize} {circumference - segmentDividerSize}"
      stroke-width={lineWidth}
      stroke-dashoffset={0}
      fill="none"
    />
  {/each}
  {#if value === null}
    <text style={textStyle} fill={textColor} x="50%" y="50%" dx="-25" text-anchor="middle">Impossible</text>
  {:else if type === CircleType.MONTHS}
    <text style={textStyle} fill={textColor} x="50%" y="35%" dx="-25" text-anchor="middle">
      {Math.floor(adjustedValue * 10) / 10}
    </text>
    <text style={textStyle} fill={textColor} x="50%" y="55%" dx="-25" text-anchor="middle"> Months </text>
  {:else}
    <text style={textPercent} fill={textColor} x="50%" y="50%" dx="-25" text-anchor="middle">
      {Math.floor(adjustedValue * 10)}
      <tspan dx="10">%</tspan>
    </text>
  {/if}
</svg>
