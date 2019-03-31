import React from "react";
import expect from "expect";
import { shallow } from "enzyme";

import Header from "../../components/layout/Header";
import { Consumer } from "../../context";

import { Link } from "react-router-dom";

const Header_Tests = describe("Component: Header", () => {
  it("renders Header without exploding", () => {
    expect(shallow(<Header />).length).toEqual(1);
  });

  it("links back to the heroes page (home page)", () => {
    const wrapper = shallow(<Header />);
    //DOESN'T FIND LINK. BECAUSE OF CONSUMER?
    console.log(wrapper.debug());
    expect(wrapper.find("Link").prop("to")).toEqual("/");
  });
});

export default Header_Tests;
