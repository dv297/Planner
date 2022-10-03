--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE planner;




--
-- Drop roles
--

DROP ROLE root;


--
-- Roles
--

CREATE ROLE root;
ALTER ROLE root WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:NRX2+AkjrUh5K+dRPq9eaw==$FIO6iUfMdmnhoY1pRT9PhhMfi9+/Xvx8D4aX8sR/qww=:V8Vly7xjuSbKvrG+l5GxqfhWdP+Xrc1aHBWysRhyoo8=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO root;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: root
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: root
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "planner" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: planner; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE planner WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE planner OWNER TO root;

\connect planner

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: IssueRelationType; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."IssueRelationType" AS ENUM (
    'DEPENDS_ON',
    'RELATES_TO'
);


ALTER TYPE public."IssueRelationType" OWNER TO root;

--
-- Name: IssueStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."IssueStatus" AS ENUM (
    'PLANNING',
    'NOT_STARTED',
    'IN_PROGRESS',
    'READY_FOR_REVIEW',
    'COMPLETE',
    'CLOSED'
);


ALTER TYPE public."IssueStatus" OWNER TO root;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'MEMBER'
);


ALTER TYPE public."Role" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    user_id text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text
);


ALTER TABLE public."Account" OWNER TO root;

--
-- Name: Issue; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Issue" (
    id text NOT NULL,
    title text,
    description text,
    "issueStatus" public."IssueStatus" DEFAULT 'PLANNING'::public."IssueStatus" NOT NULL,
    "projectId" text NOT NULL,
    "workspaceId" text NOT NULL,
    "workspaceIssueCount" integer DEFAULT '-1'::integer,
    "assigneeId" text,
    "sprintId" text
);


ALTER TABLE public."Issue" OWNER TO root;

--
-- Name: IssueRelation; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."IssueRelation" (
    "sourceIssueId" text NOT NULL,
    "targetIssueId" text NOT NULL,
    "issueRelationType" public."IssueRelationType" DEFAULT 'DEPENDS_ON'::public."IssueRelationType" NOT NULL,
    "projectId" text NOT NULL
);


ALTER TABLE public."IssueRelation" OWNER TO root;

--
-- Name: KeyIssue; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."KeyIssue" (
    id text NOT NULL,
    title text,
    description text,
    "issueStatus" public."IssueStatus" DEFAULT 'PLANNING'::public."IssueStatus" NOT NULL,
    "projectId" text NOT NULL,
    "workspaceId" text NOT NULL,
    "workspaceIssueCount" integer DEFAULT '-1'::integer
);


ALTER TABLE public."KeyIssue" OWNER TO root;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    "workspaceId" text NOT NULL
);


ALTER TABLE public."Project" OWNER TO root;

--
-- Name: ProjectMapEdgesSet; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."ProjectMapEdgesSet" (
    id text NOT NULL,
    data jsonb,
    "projectId" text NOT NULL
);


ALTER TABLE public."ProjectMapEdgesSet" OWNER TO root;

--
-- Name: ProjectMapPosition; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."ProjectMapPosition" (
    id text NOT NULL,
    data jsonb,
    "projectId" text NOT NULL
);


ALTER TABLE public."ProjectMapPosition" OWNER TO root;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO root;

--
-- Name: Sprint; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Sprint" (
    id text NOT NULL,
    name text NOT NULL,
    "beginDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "workspaceId" text NOT NULL
);


ALTER TABLE public."Sprint" OWNER TO root;

--
-- Name: Team; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Team" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Team" OWNER TO root;

--
-- Name: TeamInvite; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TeamInvite" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "inviteToken" text NOT NULL,
    "isAccepted" boolean DEFAULT false,
    "isExpired" boolean DEFAULT false
);


ALTER TABLE public."TeamInvite" OWNER TO root;

--
-- Name: TeamUsers; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TeamUsers" (
    id text NOT NULL,
    role public."Role" DEFAULT 'MEMBER'::public."Role" NOT NULL,
    "userId" text,
    "teamId" text NOT NULL
);


ALTER TABLE public."TeamUsers" OWNER TO root;

--
-- Name: TeamWorkspace; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."TeamWorkspace" (
    id text NOT NULL,
    "teamId" text NOT NULL,
    "workspaceId" text NOT NULL
);


ALTER TABLE public."TeamWorkspace" OWNER TO root;

--
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."User" OWNER TO root;

--
-- Name: UserPreference; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."UserPreference" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "workspaceId" text,
    "hasFinishedSetup" boolean DEFAULT false,
    "teamId" text
);


ALTER TABLE public."UserPreference" OWNER TO root;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."VerificationToken" (
    id integer NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO root;

--
-- Name: VerificationToken_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."VerificationToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."VerificationToken_id_seq" OWNER TO root;

--
-- Name: VerificationToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."VerificationToken_id_seq" OWNED BY public."VerificationToken".id;


--
-- Name: Workspace; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Workspace" (
    id text NOT NULL,
    name text,
    tag text
);


ALTER TABLE public."Workspace" OWNER TO root;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- Name: VerificationToken id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."VerificationToken" ALTER COLUMN id SET DEFAULT nextval('public."VerificationToken_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."Account" VALUES ('cl8se5yv40016ou5xlprodez3', 'cl8se5yul0009ou5xk071sk7e', 'oauth', 'google', '111679760096926343822', NULL, 'ya29.a0Aa4xrXNrIWFX0_RGIT7wijubW1yMomZ7A8YOstc0gbH7Mj48xRcBM1RiU1f2CtTAhWJx-r1FUFQJsEQ0GW8RhHPlDgKpvAispjU8HdWPoflQGqqDyUas-jSuZxuu2zGQYFs3ngBhto3dqnwY6T5xcT1TRE_haCgYKATASARESFQEjDvL99615d2bC4C-qMAGqQMMFlg0163', 1664782149, 'Bearer', 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhMDc5YjQyMDI2NDFlNTRhYmNlZDhmYjEzNTRjZTAzOTE5ZmIyOTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4MTQ3MTAwNzQ5NDItYjRlbGpudGZmbDN0NHE1OGxzZjAzZDQwZ25ha2Q5cWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4MTQ3MTAwNzQ5NDItYjRlbGpudGZmbDN0NHE1OGxzZjAzZDQwZ25ha2Q5cWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE2Nzk3NjAwOTY5MjYzNDM4MjIiLCJlbWFpbCI6ImR2djI5N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImJlX3hQeDZ5cjl2OGJHcjFjVFFRc0EiLCJuYW1lIjoiRGFuaWVsIFZ1IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQ05QRXU4U3dSeTRrQm9kVVd0TmtHbEFndGRlSHVkNTJqRzdFMHhOVmx2N0xnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRhbmllbCIsImZhbWlseV9uYW1lIjoiVnUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY2NDc3ODU1MCwiZXhwIjoxNjY0NzgyMTUwfQ.XisFqaq6g1dYl97wtmaWAIZxF881LHqLc5c3b8GBodwG2U-JWwkCx-Cf4j1w9W7w2bXSoBaTJXKSO98uj53uzfvVclOJCasjPlCeWp_azbGtl5maqdoyvcC4pf8ZVki0uYQSE1jAnywiLg0UzZt37dGER5HJ3rf4rQNchTMQnVzhBoxNjoDwkFNpCUS3k-jZVj-uILXI69DDZaU63cagm7GcC5nuaiqqZTDRN7NtTUd6EFu3pmk2inakKzSb9LF7KO1Hxup2efQt59obfBWg3kMxvqF_beZQj2pfxuiv4PpRVmyg-LiyPmizbYhD0uOp14PmROB6IOkLZBDCAN-Z7w', NULL, NULL, NULL);


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
-- Data for Name: KeyIssue; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."KeyIssue" VALUES ('cl8se61ur0133ou5xasggwdcy', 'My First Planner Project', 'A sample project in order to introduce you to the features of Planner.

Here, you can provide a description of your project, just enough to help people get an idea of what you are trying to achieve. You can click on this description and most fields in the app to make modifications.

This also supports **Markdown**. When you edit the description field, you''ll be given various controls to style the text in this field. You can also learn more about Markdown by going to this [link](https://www.markdownguide.org/). 

When you are finished editing the field, you can click outside of this field and we''ll automatically close and save the edit box for you.', 'PLANNING', 'cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z', 1);


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."Project" VALUES ('cl8se61ur0132ou5xcdjjyqab', 'cl8se61u00104ou5xog7gdv8z');


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



--
-- Data for Name: Sprint; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: Team; Type: TABLE DATA; Schema: public; Owner: root
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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."User" VALUES ('cl8se5yul0009ou5xk071sk7e', 'Daniel Vu', 'dvv297@gmail.com', NULL, 'https://lh3.googleusercontent.com/a-/ACNPEu8SwRy4kBodUWtNkGlAgtdeHud52jG7E0xNVlv7Lg=s96-c', '2022-10-03 06:29:10.7', '2022-10-03 06:29:14.458');


--
-- Data for Name: UserPreference; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."UserPreference" VALUES ('cl8se5zqq0041ou5xyw46rsni', 'cl8se5yul0009ou5xk071sk7e', NULL, true, NULL);


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: Workspace; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public."Workspace" VALUES ('cl8se61u00104ou5xog7gdv8z', 'Task', 'TASK');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public._prisma_migrations VALUES ('ba175ffe-deaf-4845-929b-1ebf07c3b982', 'c08dd8e0de238b79643d7b086b719cea36ca74e12f1e6b83b6cd398d56525f9d', '2022-10-03 06:28:15.977382+00', '20220829183033_init', NULL, NULL, '2022-10-03 06:28:15.9158+00', 1);
INSERT INTO public._prisma_migrations VALUES ('02648d80-23d3-49a6-a42c-8b4dd7400218', '316d02a66dcc096639fdcba5578e052a2baeca0b9f6f9f4defdb34a53d8a0068', '2022-10-03 06:28:16.130709+00', '20220919115327_add_team_invite', NULL, NULL, '2022-10-03 06:28:16.120053+00', 1);
INSERT INTO public._prisma_migrations VALUES ('6a96c8ae-a42b-4c87-8ee4-a35e94b08bc4', '293f57911292f2e2a218f73d9b5ef7527088239a7773af3c069dddfba2bd353c', '2022-10-03 06:28:15.989429+00', '20220829183944_added_user_preference', NULL, NULL, '2022-10-03 06:28:15.978848+00', 1);
INSERT INTO public._prisma_migrations VALUES ('2a7129e0-fc3f-42a3-aa15-37b928705f42', '039590491f45bb0ba3244b5f42d34b2145c5ede9fbc68f757c34bfc5094fa165', '2022-10-03 06:28:16.003151+00', '20220830220453_added_team_workspaces', NULL, NULL, '2022-10-03 06:28:15.990987+00', 1);
INSERT INTO public._prisma_migrations VALUES ('fc3f0163-a97c-44ec-9b41-adf4354152e4', '504070234fad312345cd2427ad732dd5292a6e7a4e6baac00b5f25a50af8623b', '2022-10-03 06:28:16.016462+00', '20220901183656_rename_setup_column', NULL, NULL, '2022-10-03 06:28:16.006535+00', 1);
INSERT INTO public._prisma_migrations VALUES ('f5a0f41c-bedb-4857-8a59-17b8d493f888', 'd0d7c7c896e25ebe138b57975aa5820178fb59feb86ba33c870cbc7b0cbc8665', '2022-10-03 06:28:16.138256+00', '20220919115548_add_invite_token_field', NULL, NULL, '2022-10-03 06:28:16.132126+00', 1);
INSERT INTO public._prisma_migrations VALUES ('609b8640-311a-437a-bb02-f5f686c65d9b', '16708ecd13b21811b55fb11cdc96d80426ce644e64d957b70ebb2d03ad4254ac', '2022-10-03 06:28:16.027507+00', '20220902185046_make_user_preference_unique', NULL, NULL, '2022-10-03 06:28:16.018523+00', 1);
INSERT INTO public._prisma_migrations VALUES ('83d7abc3-53f4-40d4-939a-311552f7f92e', 'f66639361df284e70fcd91cba3aa17cc2a1f95cf5579aa69439ef9484d6f198f', '2022-10-03 06:28:16.042484+00', '20220902210119_create_key_issue_relationship', NULL, NULL, '2022-10-03 06:28:16.029009+00', 1);
INSERT INTO public._prisma_migrations VALUES ('508784fd-a32d-4af0-afcc-a5ede7fe798f', '42347b9331be5a9eb44aea44bac2513bd41d8bbe51287c61f3145b1db480f480', '2022-10-03 06:28:16.049619+00', '20220903020438_add_workspace_issue_count', NULL, NULL, '2022-10-03 06:28:16.044521+00', 1);
INSERT INTO public._prisma_migrations VALUES ('5dc2f9aa-d677-48ef-89d4-aa0ffcb5a08c', 'f6811f1d7f34dcd1bd189f66fe20ed27697e093f6621c61f3f1282a313835e91', '2022-10-03 06:28:16.148065+00', '20220919134057_add_team_invite_booleans', NULL, NULL, '2022-10-03 06:28:16.140477+00', 1);
INSERT INTO public._prisma_migrations VALUES ('13f202f6-845a-42e4-b0a1-1a0c92df6e0c', '0497be9a101e24fb283cc481fbee08004397318856d428b41d9f5910533fd67e', '2022-10-03 06:28:16.063757+00', '20220908181507_add_project_map_position', NULL, NULL, '2022-10-03 06:28:16.051127+00', 1);
INSERT INTO public._prisma_migrations VALUES ('7da69c69-adcc-4e8e-a798-b40a6db46758', '44adb959eb29e8ea82b8dccb0f9fd2db239fb35306a2eb7b4d82b607163a3de8', '2022-10-03 06:28:16.079226+00', '20220909164140_add_map_edge', NULL, NULL, '2022-10-03 06:28:16.066275+00', 1);
INSERT INTO public._prisma_migrations VALUES ('5487dc70-4126-40c0-adc5-d50a5ae0e37e', '61d6c46320e4882017888a9db91dee0edb5c14e9f5def393fc550e36cdfa5df6', '2022-10-03 06:28:16.093262+00', '20220909164845_update_edge_set_table_naming', NULL, NULL, '2022-10-03 06:28:16.080724+00', 1);
INSERT INTO public._prisma_migrations VALUES ('a88b135d-af03-4027-bbb8-296e62161147', 'dc6dbcc19c64a17085bc6a2e6f27457d5b28f1ec318dbe9a036664276e76e835', '2022-10-03 06:28:16.153496+00', '20220923203412_add_assignee', NULL, NULL, '2022-10-03 06:28:16.149459+00', 1);
INSERT INTO public._prisma_migrations VALUES ('30c4cc26-e274-4ae6-807f-ec4736c0380e', 'ed03ac8442178efaa97937e44ce1cf6096dd645fa629e30c767bc672b98da873', '2022-10-03 06:28:16.102257+00', '20220914015611_add_issue_relation', NULL, NULL, '2022-10-03 06:28:16.09459+00', 1);
INSERT INTO public._prisma_migrations VALUES ('1bd9600d-7db5-4f99-bdac-03404708cdd0', 'eaf59fd6f53317e2d7084083c32c02e29c5f4bed16fa344e6514247b6164cf01', '2022-10-03 06:28:16.111435+00', '20220914020023_remove_etra_issue_relation_column', NULL, NULL, '2022-10-03 06:28:16.104145+00', 1);
INSERT INTO public._prisma_migrations VALUES ('771b4952-43a9-4fc4-9018-45f3a008f2dd', 'e55060782a86dbc2114f9efd0e62ff2c7477ec20c1231b5012c7f718cc55354e', '2022-10-03 06:28:16.11879+00', '20220914021631_add_project_id_to_issue_relation', NULL, NULL, '2022-10-03 06:28:16.112867+00', 1);
INSERT INTO public._prisma_migrations VALUES ('16946189-75c0-45cd-b243-710d5cb49df8', '0c4bc22ee07adaa8b0db6b0fd5ba223b3b25cb9471c35bbecf2297b800b6043f', '2022-10-03 06:28:16.163171+00', '20220928204225_add_sprint', NULL, NULL, '2022-10-03 06:28:16.154644+00', 1);
INSERT INTO public._prisma_migrations VALUES ('8687928e-63af-4b7d-b104-b8ed8c288540', '3b6315d1f7b9e0fd1d73b3d27d978f76d2d6464c088a7c213561d481d32d5534', '2022-10-03 06:28:16.169632+00', '20220929183154_add_sprint_to_issue', NULL, NULL, '2022-10-03 06:28:16.165075+00', 1);
INSERT INTO public._prisma_migrations VALUES ('70cf59f2-d308-4fb4-bea5-bc02e19fb688', '81038d36fb6107beb3485f10f8051d0fb420908bbe76fb20ac1cdd0a9f10f2e1', '2022-10-03 06:28:16.17438+00', '20220930205409_add_team_user_preference', NULL, NULL, '2022-10-03 06:28:16.170712+00', 1);


--
-- Name: VerificationToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."VerificationToken_id_seq"', 1, false);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: IssueRelation IssueRelation_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."IssueRelation"
    ADD CONSTRAINT "IssueRelation_pkey" PRIMARY KEY ("sourceIssueId", "targetIssueId");


--
-- Name: Issue Issue_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_pkey" PRIMARY KEY (id);


--
-- Name: KeyIssue KeyIssue_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."KeyIssue"
    ADD CONSTRAINT "KeyIssue_pkey" PRIMARY KEY (id);


--
-- Name: ProjectMapEdgesSet ProjectMapEdgesSet_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."ProjectMapEdgesSet"
    ADD CONSTRAINT "ProjectMapEdgesSet_pkey" PRIMARY KEY (id);


--
-- Name: ProjectMapPosition ProjectMapPosition_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."ProjectMapPosition"
    ADD CONSTRAINT "ProjectMapPosition_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Sprint Sprint_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Sprint"
    ADD CONSTRAINT "Sprint_pkey" PRIMARY KEY (id);


--
-- Name: TeamInvite TeamInvite_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamInvite"
    ADD CONSTRAINT "TeamInvite_pkey" PRIMARY KEY (id);


--
-- Name: TeamUsers TeamUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamUsers"
    ADD CONSTRAINT "TeamUsers_pkey" PRIMARY KEY (id);


--
-- Name: TeamWorkspace TeamWorkspace_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamWorkspace"
    ADD CONSTRAINT "TeamWorkspace_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: UserPreference UserPreference_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id);


--
-- Name: Workspace Workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Workspace"
    ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_provider_provider_account_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON public."Account" USING btree (provider, provider_account_id);


--
-- Name: Issue_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Issue_id_key" ON public."Issue" USING btree (id);


--
-- Name: KeyIssue_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "KeyIssue_id_key" ON public."KeyIssue" USING btree (id);


--
-- Name: KeyIssue_projectId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "KeyIssue_projectId_key" ON public."KeyIssue" USING btree ("projectId");


--
-- Name: ProjectMapEdgesSet_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "ProjectMapEdgesSet_id_key" ON public."ProjectMapEdgesSet" USING btree (id);


--
-- Name: ProjectMapEdgesSet_projectId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "ProjectMapEdgesSet_projectId_key" ON public."ProjectMapEdgesSet" USING btree ("projectId");


--
-- Name: ProjectMapPosition_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "ProjectMapPosition_id_key" ON public."ProjectMapPosition" USING btree (id);


--
-- Name: ProjectMapPosition_projectId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "ProjectMapPosition_projectId_key" ON public."ProjectMapPosition" USING btree ("projectId");


--
-- Name: Project_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Project_id_key" ON public."Project" USING btree (id);


--
-- Name: Session_session_token_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Session_session_token_key" ON public."Session" USING btree (session_token);


--
-- Name: Sprint_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Sprint_id_key" ON public."Sprint" USING btree (id);


--
-- Name: TeamInvite_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TeamInvite_id_key" ON public."TeamInvite" USING btree (id);


--
-- Name: TeamInvite_inviteToken_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TeamInvite_inviteToken_key" ON public."TeamInvite" USING btree ("inviteToken");


--
-- Name: TeamUsers_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TeamUsers_id_key" ON public."TeamUsers" USING btree (id);


--
-- Name: TeamWorkspace_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "TeamWorkspace_id_key" ON public."TeamWorkspace" USING btree (id);


--
-- Name: Team_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Team_id_key" ON public."Team" USING btree (id);


--
-- Name: UserPreference_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserPreference_id_key" ON public."UserPreference" USING btree (id);


--
-- Name: UserPreference_userId_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "UserPreference_userId_key" ON public."UserPreference" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Workspace_id_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Workspace_id_key" ON public."Workspace" USING btree (id);


--
-- Name: Account Account_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Issue Issue_assigneeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Issue Issue_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Issue Issue_sprintId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES public."Sprint"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Issue Issue_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Issue"
    ADD CONSTRAINT "Issue_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: KeyIssue KeyIssue_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."KeyIssue"
    ADD CONSTRAINT "KeyIssue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: KeyIssue KeyIssue_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."KeyIssue"
    ADD CONSTRAINT "KeyIssue_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectMapEdgesSet ProjectMapEdgesSet_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."ProjectMapEdgesSet"
    ADD CONSTRAINT "ProjectMapEdgesSet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectMapPosition ProjectMapPosition_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."ProjectMapPosition"
    ADD CONSTRAINT "ProjectMapPosition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Project Project_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Sprint Sprint_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Sprint"
    ADD CONSTRAINT "Sprint_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamInvite TeamInvite_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamInvite"
    ADD CONSTRAINT "TeamInvite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamUsers TeamUsers_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamUsers"
    ADD CONSTRAINT "TeamUsers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamUsers TeamUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamUsers"
    ADD CONSTRAINT "TeamUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TeamWorkspace TeamWorkspace_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamWorkspace"
    ADD CONSTRAINT "TeamWorkspace_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamWorkspace TeamWorkspace_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."TeamWorkspace"
    ADD CONSTRAINT "TeamWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPreference UserPreference_teamId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserPreference UserPreference_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPreference UserPreference_workspaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."UserPreference"
    ADD CONSTRAINT "UserPreference_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES public."Workspace"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO root;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: root
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

