export type FieldInfo = {
  type: string | "PDFTextField";
  name: string;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};
