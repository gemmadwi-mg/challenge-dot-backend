require('dotenv').config();
const request = require('supertest')
const assert = require('assert');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app')
const { UserGame } = require('../models');


const userPayload = {
    username: "gembox",
    password: 'gem123',
    email: 'ggembox123@mail.com'
};

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


describe('Usergame signup route', () => {
    describe('should return a 201 and create new usergame', () => {
        it('should be return 201', async () => {
            const usergame = {
                username: 'gembox',
                password: 'gem123',
                email: 'ggembox123@mail.com',
                role: 'admin'
            }

            const res = await request(app).post("/api/v1/usergame/signup").send(usergame);

            expect(res.statusCode).toBe(201);

        })
    })
    describe("should return a 404 and doesn't create new usergame", () => {
        it('should be return an 404', async () => {
            const usergame = {
                username: "gembox",
                password: 'gem123',
                email: 'ggembox123@mail.com'
            }

            const res = await request(app).post("/api/v1/usergame/signup").send(usergame);

            expect(res.statusCode).toBe(404);

        }),
        it('should be return an 404 because username must be unique', async () => {
            const usergame = {
                username: "gembox",
                password: 'gem123',
                email: 'ggembox1234@mail.com'
            }

            const res = await request(app).post("/api/v1/usergame/signup").send(usergame);

            expect(res.statusCode).toBe(404);
            expect(res.body.message.errors[0].message).toBe('username must be unique');

        }),
        it('should be return an 404 because email must be unique', async () => {
            const usergame = {
                username: "gembox123",
                password: 'gem123',
                email: 'ggembox123@mail.com'
            }

            const res = await request(app).post("/api/v1/usergame/signup").send(usergame);

            expect(res.statusCode).toBe(404);
            expect(res.body.message.errors[0].message).toBe('email must be unique');

        }),
        it('should be return an 400 because the field should not empty', async () => {
            const usergame = {
                username: "",
                password: '',
                email: ''
            }

            const res = await request(app).post("/api/v1/usergame/signup").send(usergame);

            expect(res.statusCode).toBe(400);
            expect(res.body.errors.errors[0].msg).toBe('Invalid value');

        })
    })
   
})


describe('Usergame login route', () => {
    describe('when user login', () => {
        it('should be return 200 when success and return token', async () => {
            const usergame = {
                email: 'ggembox123@mail.com',
                password: 'gem123'
            }

            await request(app)
                .post('/api/v1/usergame/login')
                .send(usergame)
                .expect(200)
                .expect(function (res) {
                    assert(res.body.hasOwnProperty('status'));
                    assert(res.body.hasOwnProperty('token'));
                })

        }),
            it('should be return 404 when error wrong password', async () => {
                const usergame = {
                    email: 'ggembox123@mail.com',
                    password: 'gem12'
                }

                const res = await request(app).post("/api/v1/usergame/login").send(usergame);

                expect(res.statusCode).toBe(404);
                expect(res.body.status).toBe('error');
                expect(res.body.message).toBe('Wrong password');

            }),
            it('should be return 404 when error user not found wrong email and password', async () => {
                const usergame = {
                    email: 'ggembox12@mail.com',
                    password: 'gem12'
                }

                const res = await request(app).post("/api/v1/usergame/login").send(usergame);

                expect(res.statusCode).toBe(404);
                expect(res.body.status).toBe('fail');
                expect(res.body.message.message).toBe('User Not Found');

            }),
            it('should be return 400 when error email and password empty', async () => {
                const usergame = {
                    email: '',
                    password: ''
                }

                const res = await request(app).post("/api/v1/usergame/login").send(usergame);

                expect(res.statusCode).toBe(400);
                expect(res.body.status).toBe('error');
                expect(res.body.message).toBe('Please provide email and password!');

            })
    })
})

describe("given the user is not logged in", () => {
    it("should return a 401", async () => {
        const res = await request(app).post("/api/v1/usergamehistory");

        expect(res.statusCode).toBe(401);
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('You are not logged in! Please log in to get access.');
    });
});

describe("given the user is logged in", () => {
    describe("create usergamehistory route", () => {
        it("should return a 201 and create the usergamehistory", async () => {
            const foundUser = await UserGame.findOne({ where: { email: userPayload.email } });

            const isValidPassword = bcrypt.compareSync(userPayload.password, foundUser.password);

            if (isValidPassword) {

                const payload = {
                    user_game_id: foundUser.user_game_id,
                    username: foundUser.username,
                    password: foundUser.password,
                    email: foundUser.email,
                    role: foundUser.role
                };

                const jwt = signToken(payload);

                const res = await request(app)
                    .post("/api/v1/usergamehistory")
                    .set("Authorization", `Bearer ${jwt}`)
                    .send({
                        skor: 100,
                        user_game_id: 1
                    });

                expect(res.statusCode).toBe(201);
            }

        });

    });
})
