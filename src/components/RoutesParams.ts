type RoutesListType = {
  name: string;
  routes: string;
}[];

const routesList: RoutesListType = [
  {
    name: "Home",
    routes: "/"
  },
  {
    name: "Travel",
    routes: "/travel"
  },
  {
    name: "About us",
    routes: "/about"
  }
];

export default routesList;
