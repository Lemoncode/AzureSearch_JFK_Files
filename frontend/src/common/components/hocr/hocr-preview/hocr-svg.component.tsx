import * as React from "react";
import { getNodeOptions, bboxToPosSize, getNodeId, composeId } from "../util/common-util";
import { SvgTooltip } from "../../svg/tooltip";

/**
 * HOCR Node SVG
 */

interface SvgRectProps {
  node: Element;
  className: string;
  idSuffix: string;
  onHover?: (id: string) => void;
}

interface State {
  isOpenTooltip: boolean;
}

export class SvgRectComponent extends React.PureComponent<SvgRectProps, State> {
  state = {
    isOpenTooltip: false,
  };

  onHover = (id: string, isOpenTooltip) => () => {
    this.updateIsOpenTooltip(isOpenTooltip);
    if (this.props.onHover) {
      this.props.onHover(id);
    }
  }

  updateIsOpenTooltip = (isOpenTooltip) => {
    this.setState({
      isOpenTooltip,
    });
  }

  render() {
    const nodeOptions = getNodeOptions(this.props.node);
    if (!nodeOptions || !nodeOptions.bbox) return null;

    const nodePosSize = bboxToPosSize(nodeOptions.bbox);
    const id = getNodeId(this.props.node);
    const suffixedId = composeId(id, this.props.idSuffix);

    return (
      <g>
        <rect
          className={this.props.className}
          id={suffixedId}
          x={nodePosSize.x}
          y={nodePosSize.y}
          width={nodePosSize.width}
          height={nodePosSize.height}
          onMouseEnter={this.onHover(id, true)}
          onMouseLeave={this.onHover(null, false)}
        />
        {
          this.state.isOpenTooltip &&
          <SvgTooltip
            x={nodePosSize.x}
            y={nodePosSize.y}
          />
        }
      </g>
    );
  }
}

interface SvgGroupProps {
  className: string;
}

export const SvgGroupComponent: React.StatelessComponent<SvgGroupProps> = (props) => {
  return (
    <g className={props.className}>
      {props.children}
    </g>
  );
};
