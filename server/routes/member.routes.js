const MemberController = require("../controllers/member.controller");

module.exports = (app) => {
  app.get("/api/members", MemberController.getAllMembers);
  app.post("/api/members", MemberController.createMember);
  app.get("/api/members/:id", MemberController.getOneMember);
  app.put("/api/members/:id", MemberController.editMember);
  app.delete("/api/members/:id", MemberController.deleteMember);
};
