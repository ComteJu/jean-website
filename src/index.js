import React, { useState, useContext } from "react";
import Layout from "./components/layout";

export const Context = React.createContext();
export const useAppContext = () => useContext(Context);

const Root = props => {
  const [modal, setModal] = useState("test");
  const context = {
    modal,
    setModal
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export const wrapPageElement = ({ props, element }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
);
