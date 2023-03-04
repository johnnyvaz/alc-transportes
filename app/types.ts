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

export type Setting = {
  id: string;
  name: string;
  address: string;
  default: boolean;
  profile_id: string;
};

export type Route = {
  id: String;
  orderid: String;
  route: Number;
  stop: String;
  printed: boolean;
  datePrinted: string;
  dateCreated: string;
  profile_id: string;
};


export type LoaderData = {
  routeListItems: Route[];
  routePrintedListItems: Route[];
  setting: Setting;
  getPrinter: string
  route: Route;

};