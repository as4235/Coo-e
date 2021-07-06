import teeup from '../teeup/[id]';

let json_stub = jest.fn(x => x);

const dbMock = {
  select: (col) => {
    return {
      from: (table) => {
        return {
          join: (col) => {
            return {
              join: (col) => {
                return {
                  join: (col) => {
                    return {
                      join: (col) => {
                        return {
                          join: (col) => {
                            return {
                              join: (col) => {
                                return {
                                  where: (col) => {
                                    return [{
                                      teeupid: 1,
                                      teeupname: "a",
                                      status: "b"
                                    }]
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }
}

jest.mock('@auth0/nextjs-auth0', () => {
  return {
    __esModule: true,
    withApiAuthRequired: (fn) => {
      return fn
    }
  };
});

jest.mock('../../../src/db', () => {
  return {
    __esModule: true,
    db: dbMock
  };
});

describe("api/teeups/[query] route", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: "a"
    };

    res = {
      json: (result) => {
        json_stub(result);
        return {
          body: result
        };
      }
    };

    json_stub = jest.fn(x => null);
  });

  afterEach(() => {
    json_stub.mockReset();
  });

  test("should return teeups", async () => {
    const response: any = await teeup(req, res);
    expect(json_stub.mock.calls.length).toBe(1);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("teeupid");
    expect(response.body[0]).toHaveProperty("teeupname");
    expect(response.body[0]).toHaveProperty("status");
  });
});
