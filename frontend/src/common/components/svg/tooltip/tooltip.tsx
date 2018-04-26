import * as React from 'react';
const styles = require('./tooltip.scss');

interface Props {
  x: number;
  y: number;
}

export const SvgTooltip: React.StatelessComponent<Props> = (props) => (
  <g
    className={styles.tooltip}
    transform="translate(-50,-50)"
  >
    <rect
      x={props.x}
      y={props.y}
      className={styles.background}
      rx="5"
      width="100"
      height="25"
    />
    <text
      x={props.x}
      y={props.y}
      className={styles.title}
    >
      Hello
    </text>
  </g>
);
