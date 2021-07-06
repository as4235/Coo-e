import delUser from '../delete_user';

let json_stub = jest.fn(x => x);
let del_stub = jest.fn(x => null);

const dbMock = {
    from: (table) => {
        return {
            where: (col) => {
                return {
                    where: (col) => {
                        return {
                            del: async (del) => {
                                del_stub(del);
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

describe("addNewUser route", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: "a"
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
        del_stub = jest.fn(x => null);
    });

    afterEach(() => {
        json_stub.mockReset()
        del_stub.mockReset()
    });

    test("should return teeups", async () => {
        const response: any = await delUser(req, res);
        expect(json_stub.mock.calls.length).toBe(1);
        expect(del_stub.mock.calls.length).toBe(4);
    });
});
