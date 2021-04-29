import React, { Component } from "react";
import Completed from "./completed_img";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import OkHandImg from "./ok_hand_img";
import DangerImg from "./danger_img";
import { NavLink } from "react-router-dom";

import timelineElements from "../data/timelineElements"

class ProgressReportVertical extends Component {
  render() {
    return (
      <div>
        <VerticalTimeline>
            {timelineElements.map(element => {
                let showButton =
                element.buttonText !== undefined &&
                element.buttonText !== null &&
                element.buttonText !== ""

                return(
                    <VerticalTimelineElement
                    key={element.key}
                    date={element.date}
                    iconStyle={{ background: "transparent" }}
                    icon={element.icon==="hand" ? <DangerImg /> : <OkHandImg />}
                    >
                        <h3 className="vertical-timeline-element-title">{element.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle">{element.location}</h4>

                        <p>{element.description}</p>

                        {showButton && (
                            <p>
                            <NavLink to="/spinner" exact>
                              {element.buttonText}
                            </NavLink>
                          </p>
                        )}    

                    </VerticalTimelineElement>
                )
            })}
            <VerticalTimelineElement
            date="há poucos segundos"
            iconStyle={{ background: "transparent" }}
            icon={<Completed />}
          />
        </VerticalTimeline>
      </div>
    );
  }
}

export default ProgressReportVertical;
