export type PrinterStatus = {
  message: string;
  status: string;
};

export type Scripting = {
  order: string;
  route: string;
  stop: string;
}

export type FileProps = {
  lastModified: number;
  webkitRelativePath: string;
  filepath: string;
  type: string;
  name: string
}