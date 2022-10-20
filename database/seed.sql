--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."User" VALUES ('cl8se5yul0009ou5xk071sk7e', 'Daniel Vu', 'dvv297@gmail.com', NULL, 'https://planner-user-image-upload.s3.us-east-1.amazonaws.com/next-s3-uploads/2d72d68d-4738-4308-bffd-88b70e9404a8/profile.jpeg', '2022-10-03 06:29:10.7', '2022-10-03 06:29:14.458');


--
-- Data for Name: UserPreference; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."UserPreference" VALUES ('cl8se5zqq0041ou5xyw46rsni', 'cl8se5yul0009ou5xk071sk7e', NULL, true, NULL);


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."Account" VALUES ('cl8se5yv40016ou5xlprodez3', 'cl8se5yul0009ou5xk071sk7e', 'oauth', 'google', '111679760096926343822', NULL, 'ya29.a0Aa4xrXNrIWFX0_RGIT7wijubW1yMomZ7A8YOstc0gbH7Mj48xRcBM1RiU1f2CtTAhWJx-r1FUFQJsEQ0GW8RhHPlDgKpvAispjU8HdWPoflQGqqDyUas-jSuZxuu2zGQYFs3ngBhto3dqnwY6T5xcT1TRE_haCgYKATASARESFQEjDvL99615d2bC4C-qMAGqQMMFlg0163', 1664782149, 'Bearer', 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhMDc5YjQyMDI2NDFlNTRhYmNlZDhmYjEzNTRjZTAzOTE5ZmIyOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4MTQ3MTAwNzQ5NDItYjRlbGpudGZmbDN0NHE1OGxzZjAzZDQwZ25ha2Q5cWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4MTQ3MTAwNzQ5NDItYjRlbGpudGZmbDN0NHE1OGxzZjAzZDQwZ25ha2Q5cWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE2Nzk3NjAwOTY5MjYzNDM4MjIiLCJlbWFpbCI6ImR2djI5N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImJlX3hQeDZ5cjl2OGJHcjFjVFFRc0EiLCJuYW1lIjoiRGFuaWVsIFZ1IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQ05QRXU4U3dSeTRrQm9kVVd0TmtHbEFndGRlSHVkNTJqRzdFMHhOVmx2N0xnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRhbmllbCIsImZhbWlseV9uYW1lIjoiVnUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY2NDc3ODU1MCwiZXhwIjoxNjY0NzgyMTUwfQ.XisFqaq6g1dYl97wtmaWAIZxF881LHqLc5c3b8GBodwG2U-JWwkCx-Cf4j1w9W7w2bXSoBaTJXKSO98uj53uzfvVclOJCasjPlCeWp_azbGtl5maqdoyvcC4pf8ZVki0uYQSE1jAnywiLg0UzZt37dGER5HJ3rf4rQNchTMQnVzhBoxNjoDwkFNpCUS3k-jZVj-uILXI69DDZaU63cagm7GcC5nuaiqqZTDRN7NtTUd6EFu3pmk2inakKzSb9LF7KO1Hxup2efQt59obfBWg3kMxvqF_beZQj2pfxuiv4PpRVmyg-LiyPmizbYhD0uOp14PmROB6IOkLZBDCAN-Z7w', NULL, NULL, NULL);


--
-- Data for Name: Workspace; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."Workspace" VALUES ('cl8se61u00104ou5xog7gdv8z', 'Task', 'TASK');


--
-- Data for Name: Sprint; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."Team" VALUES ('cl8se61t00085ou5xqqubzky2', 'Personal');


--
-- Data for Name: TeamInvite; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: TeamUsers; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."TeamUsers" VALUES ('cl8se61tl0092ou5xma2z8und', 'MEMBER', 'cl8se5yul0009ou5xk071sk7e', 'cl8se61t00085ou5xqqubzky2');


--
-- Data for Name: TeamWorkspace; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."TeamWorkspace" VALUES ('cl8se61ub0111ou5xnowzqubn', 'cl8se61t00085ou5xqqubzky2', 'cl8se61u00104ou5xog7gdv8z');

--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."Project" VALUES ('cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z');


--
-- Data for Name: KeyIssue; Type: TABLE DATA; Schema: public; Owner: root
--


INSERT INTO public."KeyIssue" VALUES ('cl8se61ur0133ou5xasggwdcy', 'My First Planner Project', 'A sample project in order to introduce you to the features of Planner.

Here, you can provide a description of your project, just enough to help people get an idea of what you are trying to achieve. You can click on this description and most fields in the app to make modifications.

This also supports **Markdown**. When you edit the description field, you''ll be given various controls to style the text in this field. You can also learn more about Markdown by going to this [link](https://www.markdownguide.org/).

When you are finished editing the field, you can click outside of this field and we''ll automatically close and save the edit box for you.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 1);



--
-- Data for Name: Issue; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."Issue" VALUES ('cl8se61vk0146ou5x5f37szvk', 'Setup linting / formatting', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 3, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0147ou5xg8psq54u', 'Setup Github repository', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 2, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0151ou5xf74yn1ki', 'Create registration page', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 7, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0153ou5xsy45mrky', 'Create sign in page', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 8, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0150ou5xjf1zqcm8', 'Setup E2E tests', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 5, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0155ou5xxzcua0d9', 'Configure component library', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 10, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0160ou5x6kgg51nv', 'Research email client', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 13, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0149ou5xby9kp840', 'Configure Docker', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 4, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0152ou5xhp43sh2r', 'Research authentication libraries', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 6, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0161ou5xckf6m5cw', 'Create team settings page', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 12, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0158ou5xbonb49hy', 'Create personal settings page', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 11, NULL, NULL);
INSERT INTO public."Issue" VALUES ('cl8se61vk0156ou5xarbmt5pp', 'Create sign out page', 'This is a sample issue. In here, you can describe what needs to be done.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 9, NULL, NULL);


--
-- Data for Name: IssueRelation; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: ProjectMapEdgesSet; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."ProjectMapEdgesSet" VALUES ('cl8se61yg0230ou5x6rccfutp', '"{\"edges\":[{\"id\":\"reactflow__edge-cl8se61vk0147ou5xg8psq54u-cl8se61vk0146ou5x5f37szvk\",\"source\":\"cl8se61vk0147ou5xg8psq54u\",\"target\":\"cl8se61vk0146ou5x5f37szvk\"},{\"id\":\"reactflow__edge-cl8se61vk0147ou5xg8psq54u-cl8se61vk0149ou5xby9kp840\",\"source\":\"cl8se61vk0147ou5xg8psq54u\",\"target\":\"cl8se61vk0149ou5xby9kp840\"},{\"id\":\"reactflow__edge-cl8se61vk0149ou5xby9kp840-cl8se61vk0150ou5xjf1zqcm8\",\"source\":\"cl8se61vk0149ou5xby9kp840\",\"target\":\"cl8se61vk0150ou5xjf1zqcm8\"},{\"id\":\"reactflow__edge-cl8se61vk0146ou5x5f37szvk-cl8se61vk0152ou5xhp43sh2r\",\"source\":\"cl8se61vk0146ou5x5f37szvk\",\"target\":\"cl8se61vk0152ou5xhp43sh2r\"},{\"id\":\"reactflow__edge-cl8se61vk0152ou5xhp43sh2r-cl8se61vk0151ou5xf74yn1ki\",\"source\":\"cl8se61vk0152ou5xhp43sh2r\",\"target\":\"cl8se61vk0151ou5xf74yn1ki\"},{\"id\":\"reactflow__edge-cl8se61vk0152ou5xhp43sh2r-cl8se61vk0153ou5xsy45mrky\",\"source\":\"cl8se61vk0152ou5xhp43sh2r\",\"target\":\"cl8se61vk0153ou5xsy45mrky\"},{\"id\":\"reactflow__edge-cl8se61vk0152ou5xhp43sh2r-cl8se61vk0156ou5xarbmt5pp\",\"source\":\"cl8se61vk0152ou5xhp43sh2r\",\"target\":\"cl8se61vk0156ou5xarbmt5pp\"},{\"id\":\"reactflow__edge-cl8se61vk0146ou5x5f37szvk-cl8se61vk0155ou5xxzcua0d9\",\"source\":\"cl8se61vk0146ou5x5f37szvk\",\"target\":\"cl8se61vk0155ou5xxzcua0d9\"},{\"id\":\"reactflow__edge-cl8se61vk0146ou5x5f37szvk-cl8se61vk0158ou5xbonb49hy\",\"source\":\"cl8se61vk0146ou5x5f37szvk\",\"target\":\"cl8se61vk0158ou5xbonb49hy\"},{\"id\":\"reactflow__edge-cl8se61vk0146ou5x5f37szvk-cl8se61vk0161ou5xckf6m5cw\",\"source\":\"cl8se61vk0146ou5x5f37szvk\",\"target\":\"cl8se61vk0161ou5xckf6m5cw\"},{\"id\":\"reactflow__edge-cl8se61vk0161ou5xckf6m5cw-cl8se61vk0160ou5x6kgg51nv\",\"source\":\"cl8se61vk0161ou5xckf6m5cw\",\"target\":\"cl8se61vk0160ou5x6kgg51nv\"}]}"', 'cl8se61ur0132ou5xcdjjyqab');


--
-- Data for Name: ProjectMapPosition; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."ProjectMapPosition" VALUES ('cl8se61y90223ou5xdinqlge7', '"{\"positions\":[{\"issueId\":\"cl8se61vk0147ou5xg8psq54u\",\"position\":{\"x\":0,\"y\":100}},{\"issueId\":\"cl8se61vk0146ou5x5f37szvk\",\"position\":{\"x\":413.2312314266849,\"y\":100.61661713782635}},{\"issueId\":\"cl8se61vk0149ou5xby9kp840\",\"position\":{\"x\":415.43306046265025,\"y\":441.8991878298392}},{\"issueId\":\"cl8se61vk0150ou5xjf1zqcm8\",\"position\":{\"x\":733.8959327073071,\"y\":440.0460712899451}},{\"issueId\":\"cl8se61vk0152ou5xhp43sh2r\",\"position\":{\"x\":382.208666369326,\"y\":-185.1989171064523}},{\"issueId\":\"cl8se61vk0151ou5xf74yn1ki\",\"position\":{\"x\":1333.4960615418495,\"y\":-503.1035776073181}},{\"issueId\":\"cl8se61vk0153ou5xsy45mrky\",\"position\":{\"x\":1337.4073887840177,\"y\":-340.83971276708394}},{\"issueId\":\"cl8se61vk0156ou5xarbmt5pp\",\"position\":{\"x\":1334.679832916552,\"y\":-191.04558160457026}},{\"issueId\":\"cl8se61vk0155ou5xxzcua0d9\",\"position\":{\"x\":854.0488447220823,\"y\":99.72016064155886}},{\"issueId\":\"cl8se61vk0158ou5xbonb49hy\",\"position\":{\"x\":1349.8458457155434,\"y\":99.39139425804487}},{\"issueId\":\"cl8se61vk0161ou5xckf6m5cw\",\"position\":{\"x\":1353.0730714442927,\"y\":273.54154284456587}},{\"issueId\":\"cl8se61vk0160ou5x6kgg51nv\",\"position\":{\"x\":1793.5375371466303,\"y\":274.31031141788094}}]}"', 'cl8se61ur0132ou5xcdjjyqab');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: root
--

