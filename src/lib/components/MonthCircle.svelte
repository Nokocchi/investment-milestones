<script lang="ts">
    import { range } from "../shared/utils";


  const {
    numberOfMonths: numberOfMonthsReached = 0,
    lineWidth = 30,
    bgColor = "black",
    color = "red",
    textColor = "yellow",
    responsive = true,
    animation = true,
    textStyle = "font: bold 4rem Helvetica, Arial, sans-serif;",
    title,
    ...rest
  } = $props();

  const lastSegmentCompletionDecimals = numberOfMonthsReached % 1;
  const numberOfCompletedMonths = Math.floor(numberOfMonthsReached);
  const svgSize = "100%";
  const radius = 175;
  const circumference = Math.PI * 2 * radius;
  const segmentDividerSize = 10;
  const segmentSize = circumference / 12 - segmentDividerSize;
  const segmentSizeDegrees = (segmentSize / circumference) * 360;
  const segmentDividerDegrees = (segmentDividerSize / circumference) * 360;

  const getRotationOfSegment = (segmentNumber: number): number => {
    return (segmentSizeDegrees + segmentDividerDegrees) * segmentNumber;
  };

  const getDashArray = (segmentNumber: number): string => {
    const segmentFilledPercent = segmentNumber == numberOfCompletedMonths ? lastSegmentCompletionDecimals : 1;
    const dash0 = segmentSize * segmentFilledPercent + segmentDividerSize;
    const dash1 = circumference - (segmentSize * segmentFilledPercent + segmentDividerSize);
    return dash0 + " " + dash1;
  };
</script>

{title}
<svg xmlns="http://www.w3.org/2000/svg" width={svgSize} height={svgSize} viewBox="-25 -25 400 400" {...rest}>
  <circle stroke={bgColor} cx={radius} cy={radius} r={radius} stroke-width={lineWidth} fill="none" />
  {#each range(12) as segmentNumber}
    {#if segmentNumber < numberOfMonthsReached}
      <circle
        stroke="hsl({(120 / 12) * segmentNumber}, 100%, 50%)"
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
  <text style={textStyle} fill={textColor} x="50%" y="35%" dx="-25" text-anchor="middle">
    {Math.floor(numberOfMonthsReached * 10) / 10}
  </text>
  <text style={textStyle} fill={textColor} x="50%" y="55%" dx="-25" text-anchor="middle">
    Months
  </text>
</svg>
