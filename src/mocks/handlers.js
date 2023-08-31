import { rest } from "msw";

const path = "/api/todos";

const mocks = [
  { id: 1, name: "Asd1" },
  { id: 2, name: "Asd2" },
];

export const handlers = [
  //   rest.post(path, (req, res, ctx) => {
  //     // Persist user's authentication in the session
  //     sessionStorage.setItem("is-authenticated", "true");

  //     return res(
  //       // Respond with a 200 status code
  //       ctx.status(200)
  //     );
  //   }),

  rest.get(path, (req, res, ctx) => {
    // Check if the todos are in this session
    const todos = sessionStorage.getItem("todos");

    if (!todos) {
      sessionStorage.setItem("todos", JSON.stringify(mocks));
      return res(ctx.delay(2000), ctx.status(201), ctx.json(mocks));
    }

    // Return a mocked todos from session
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json(JSON.parse(sessionStorage.getItem("todos")))
    );
  }),
];
