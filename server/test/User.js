import User from "../models/User.js";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import should from "should";
import { userInfo } from "../constant.js";

chai.use(chaiHttp);

//Our parent block
describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  // Test the get all users route
  describe("/GET Users", () => {
    it("it should GET all the Users", (done) => {
      chai
        .request(app)
        .get("/api/v1/users")
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(200);
          should(res.body).be.Object;
          should(res.body).have.property("data");
          should(res.body).have.property("count");
          done();
        });
    });
  });

  // Test the get all filtered users route
  describe("/filtered Users", () => {
    it("it should GET all filtered Users", (done) => {
      chai
        .request(app)
        .get(
          "/api/v1/users/filtered?page=1&pageSize=1&startDate=1998-12-01&endDate=2001-01-09"
        )
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(200);
          should(res.body).be.Object;
          should(res.body).have.property("data");
          should(res.body).have.property("currentPage");
          should(res.body).have.property("numberOfPages");
          should(res.body).have.property("count");
          done();
        });
    });
  });

  // Testing the Single /GET route
  describe("/GET/:id User", () => {
    it("it should GET a User by the given id", (done) => {
      let UserData = new User(userInfo);
      UserData.save((err, UserData) => {
        const id = UserData._id.toString();
        chai
          .request(app)
          .get(`/api/v1/users/${id}`)
          .send(UserData)
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            should(res.body).be.Object;
            should(res.body).have.property("data");
            should(res.body.data).have.property("firstName");
            should(res.body.data).have.property("lastName");
            should(res.body.data).have.property("phoneNumber");
            should(res.body.data).have.property("email");
            should(res.body.data).have.property("dateOfBirth");
            done();
          });
      });
    });
  });

  // Testing the /POST route
  describe("/POST User", () => {
    it("it should POST if all fields are complete", (done) => {
      chai
        .request(app)
        .post("/api/v1/users/create")
        .send(userInfo)
        .end((err, res) => {
          should(res.body).not.have.property("err");
          should(res.status).be.equal(201);
          should(res.body).be.Object;
          should(res.body).have.property("data");
          should(res.body.data).have.property("_id");
          should(res.body.data).have.property("firstName");
          should(res.body.data).have.property("lastName");
          should(res.body.data).have.property("phoneNumber");
          should(res.body.data).have.property("email");
          should(res.body.data).have.property("dateOfBirth");
          done();
        });
    });
  });

  // Testing the /PATCH route
  describe("/PATCH/:id User", () => {
    it("it should UPDATE a User with the given id", (done) => {
      let UserData = new User(userInfo);
      UserData.save((err, UserData) => {
        chai
          .request(app)
          .patch("/api/v1/users/edit/" + UserData._id.toString())
          .send(UserData)
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            should(res.body).be.Object;
            should(res.body.data).have.property("_id");
            should(res.body.data).have.property("firstName");
            should(res.body.data).have.property("lastName");
            should(res.body.data).have.property("phoneNumber");
            should(res.body.data).have.property("email");
            should(res.body.data).have.property("dateOfBirth");
            done();
          });
      });
    });
  });

  // Testing the /DELETE route
  describe("/DELETE/:id User", () => {
    it("it should DELETE a User with the given id", (done) => {
      let UserData = new User(userInfo);
      UserData.save((err, UserData) => {
        chai
          .request(app)
          .delete("/api/v1/users/delete/" + UserData._id.toString())
          .end((err, res) => {
            should(res.body).not.have.property("err");
            should(res.status).be.equal(200);
            done();
          });
      });
    });
  });
});
