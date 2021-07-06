import todo from '../todo';

let json_stub = jest.fn(x => x);
let limit_stub = jest.fn(x => null);

const dbMock = {
    select: (col) => {
        return {
            from: (table) => {
                return {
                    limit: async (limit) => {
                        limit_stub(limit);
                        return [{
                            id: 1
                        }]
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

describe("todo route", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {}
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
        limit_stub = jest.fn(x => null);
    });

    afterEach(() => {
        json_stub.mockReset()
        limit_stub.mockReset();
    });

    test("should return something", async () => {
        const response: any = await todo(req, res);
        expect(limit_stub.mock.calls.length).toBe(1);
        expect(json_stub.mock.calls.length).toBe(1);

        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
    });
});
