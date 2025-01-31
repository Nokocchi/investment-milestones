<script lang="ts">
    const {
      size = 200,
      lineWidth = 30,
      bgColor = 'hsla(13, 58%, 91%, 1)',
      color = 'hsla(8, 59%, 65%, 1)',
      textColor = 'hsla(0, 0%, 20%, 1)',
      responsive = false,
      percent = 0,
      rounded = false,
      animation = true,
      textStyle = 'font: bold 5rem Helvetica, Arial, sans-serif;',
      ...rest
    }: CircleProps = $props();
  
    const offset = $derived(1100 * (1 - percent / 100));
    const svgSize = $derived(responsive ? '100%' : size);
  </script>
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={svgSize}
    height={svgSize}
    viewBox="-25 -25 400 400"
    {...rest}
  >
    <circle stroke={bgColor} cx="175" cy="175" r="175" stroke-width={lineWidth} fill="none" />
    <circle
      stroke={color}
      transform="rotate(-90 175 175)"
      cx="175"
      cy="175"
      r="175"
      stroke-dasharray="1100"
      stroke-width={lineWidth}
      stroke-dashoffset={offset}
      stroke-linecap={rounded ? 'round' : 'butt'}
      fill="none"
      style="transition: {animation ? 'stroke-dashoffset 0.5s ease-out' : 'none'}"
    />
    <text style={textStyle} fill={textColor} x="50%" y="50%" dx="-25" text-anchor="middle">
      {percent}
      <tspan dx="10">%</tspan>
    </text>
  </svg>