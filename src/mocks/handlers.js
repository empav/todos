import { rest } from "msw";

const path = "/api/todos";

const mocks = [
  { id: 1, name: "Asd1" },
  { id: 2, name: "Asd2" },
  { id: 3, name: "Asd3" },
  { id: 4, name: "Asd4" },
  { id: 5, name: "Asd5" },
  { id: 6, name: "Asd6" },
  { id: 7, name: "Asd7" },
  { id: 8, name: "Asd8" },
  { id: 9, name: "Asd9" },
  { id: 10, name: "Asd10" },
];

export const handlers = [
  rest.get(path, (req, res, ctx) => {
    const params = req.url.searchParams;
    const qs = params.get("q");

    let mockedData = mocks;
    if (qs) {
      mockedData = mocks.filter((md) =>
        md.name.toLowerCase().includes(qs.toLowerCase())
      );
    }

    return res(ctx.delay(500), ctx.status(200), ctx.json(mockedData));
  }),
];
