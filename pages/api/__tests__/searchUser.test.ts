import searchUser from '../user/[query]';

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
                      where: (col) => {
                        return {
                          orWhere: (col) => {
                            return [{
                              id: 1,
                              username: "a",
                              avatar: "b",
                              value: "c",
                              usertype: "a"
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

describe("[query] route", () => {
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

  test("should return users", async () => {
    const response: any = await searchUser(req, res);
    expect(json_stub.mock.calls.length).toBe(1);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body[0]).toHaveProperty("avatar");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("usertype");
  });
});
