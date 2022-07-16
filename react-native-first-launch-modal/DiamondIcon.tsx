import Svg, {Path} from "react-native-svg";

import React from "react";

export default class DiamondIcon extends React.PureComponent<Props> {

  render() {
    return (
      <Svg
        viewBox="0 0 24 24"
        stroke-width="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        height={this.props.size ? this.props.size.toString() : "100"}
        width={this.props.size ? this.props.size.toString() : "100"}
        stroke={this.props.color ? this.props.color : "#004d97"}>

        <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <Path d="M6 5h12l3 5l-8.5 9.5a0.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
        <Path d="M10 12l-2 -2.2l.6 -1" />
      </Svg>

    );
  }

}

interface Props {
  size?: number | undefined
  color?: string | undefined
}
