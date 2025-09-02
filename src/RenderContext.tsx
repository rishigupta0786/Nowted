import { createContext } from "react";

type RenderContextType = { 
  isRender: boolean; 
  setIsRender: (value: boolean) => void 
  MainRender: boolean; 
  setMainRender: (value: boolean) => void 
};

const defaultRenderContext: RenderContextType = {
  isRender: false,
  setIsRender: () => {},
  MainRender:false,
  setMainRender:()=>{}
};

export const RenderContext = createContext<RenderContextType>(defaultRenderContext);