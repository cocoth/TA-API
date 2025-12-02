import { terminalColors } from "@/src/utils/color";

export const colorizeMethod = (method: string): string => {
  switch (method) {
    case "GET":
      return terminalColors.GREEN + "GET" + terminalColors._reset;
    case "POST":
      return terminalColors.MAGENTA + "POST" + terminalColors._reset;
    case "PUT":
      return terminalColors.YELLOW + "PUT" + terminalColors._reset;
    case "DELETE":
      return terminalColors.RED + "DELETE" + terminalColors._reset;
    case "PATCH":
      return terminalColors.CYAN + "PATCH" + terminalColors._reset;
    case "OPTIONS":
      return terminalColors.BLUE + "OPTIONS" + terminalColors._reset;
    case "TRACE":
      return terminalColors.WHITE + "TRACE" + terminalColors._reset;
    default:
      return method;
  }
};

export const colorizeStatus = (status: number): string => {
  switch(true){
    case (status >= 100 && status < 200):
      return terminalColors.BLUE + status + terminalColors._reset;
    case (status >= 200 && status < 300):
      return terminalColors.GREEN + status + terminalColors._reset;
    case (status >= 300 && status < 400):
      return terminalColors.YELLOW + status + terminalColors._reset;
    case (status >= 400 && status < 500):
      return terminalColors.RED + status + terminalColors._reset;
    case (status >= 500):
      return terminalColors.MAGENTA + status + terminalColors._reset;
    default:
      return status.toString();
  }
}