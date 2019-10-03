import React from "react";
import {
  Header as HeaderCarbon,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem
} from "carbon-components-react";
import pages from "../config/pages";
import { withRouter } from "react-router-dom";
// eslint-disable-next-line
import _ from "element-closest";

const MENU_ITEM_CLASS = "FgbR8ge3OfxYmR6jmrfk";

export default withRouter(({ history }) => {
  const goHome = e => {
    e.preventDefault();
    history.push("/");
  };

  const go = e => {
    e.preventDefault();
    history.push(
      `/${e.target.closest(`.${MENU_ITEM_CLASS}`).firstElementChild.dataset
        .location || ""}`
    );
  };

  return (
    <HeaderCarbon aria-label="" style={{ position: "static" }}>
      <HeaderName href="" onClick={goHome} prefix="">
        Resin
      </HeaderName>
      <HeaderNavigation aria-label="">
        {pages.map(page => (
          <HeaderMenuItem
            key={page.id}
            href=""
            className={MENU_ITEM_CLASS}
            data-location={page.id}
            onClick={go}
          >
            {page.name}
          </HeaderMenuItem>
        ))}
      </HeaderNavigation>
    </HeaderCarbon>
  );
});