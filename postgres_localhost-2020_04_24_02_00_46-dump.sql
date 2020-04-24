--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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
-- Name: covid-tracker-sa2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "covid-tracker-sa2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE "covid-tracker-sa2" OWNER TO postgres;

\connect -reuse-previous=on "dbname='covid-tracker-sa2'"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: caseDates; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public."caseDates" (
    id integer NOT NULL,
    "provinceId" integer NOT NULL,
    "caseDate" date NOT NULL,
    "caseCount" integer DEFAULT 0
);


ALTER TABLE public."caseDates" OWNER TO test_user;

--
-- Name: caseDates_id_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."caseDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."caseDates_id_seq" OWNER TO test_user;

--
-- Name: caseDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."caseDates_id_seq" OWNED BY public."caseDates".id;


--
-- Name: dates; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public.dates (
    date date NOT NULL,
    "totalCases" integer NOT NULL,
    "totalDeaths" integer,
    "totalRecoveries" integer,
    "totalTests" integer,
    parsed boolean DEFAULT false,
    "maybeValid" boolean DEFAULT true,
    error boolean DEFAULT false,
    "activeCases" numeric GENERATED ALWAYS AS (("totalCases" - ("totalRecoveries" + "totalDeaths"))) STORED,
    "dailyNew" integer DEFAULT 0,
    "dailyDeaths" integer DEFAULT 0,
    "updateTime" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.dates OWNER TO test_user;

--
-- Name: deathDates; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public."deathDates" (
    id integer NOT NULL,
    "provinceId" integer NOT NULL,
    "deathDate" date NOT NULL,
    "deathCount" integer DEFAULT 0,
    "deathMenCount" integer DEFAULT 0,
    "deathWomenCount" integer DEFAULT 0
);


ALTER TABLE public."deathDates" OWNER TO test_user;

--
-- Name: deathDates_id_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."deathDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."deathDates_id_seq" OWNER TO test_user;

--
-- Name: deathDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."deathDates_id_seq" OWNED BY public."deathDates".id;


--
-- Name: deathPersons; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public."deathPersons" (
    id integer NOT NULL,
    "deathDateId" integer NOT NULL,
    "provinceName" character varying(255),
    sex character varying(255),
    "deathDate" date NOT NULL,
    age integer
);


ALTER TABLE public."deathPersons" OWNER TO test_user;

--
-- Name: deathPersons_id_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."deathPersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."deathPersons_id_seq" OWNER TO test_user;

--
-- Name: deathPersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."deathPersons_id_seq" OWNED BY public."deathPersons".id;


--
-- Name: provinceDays; Type: TABLE; Schema: public; Owner: test_user
--

CREATE TABLE public."provinceDays" (
    id integer NOT NULL,
    "provinceName" character varying(255) NOT NULL,
    "provDate" date NOT NULL,
    "caseCount" integer,
    "deathCount" integer,
    recovered integer,
    population integer,
    "testCount" integer
);


ALTER TABLE public."provinceDays" OWNER TO test_user;

--
-- Name: provinceDays_id_seq; Type: SEQUENCE; Schema: public; Owner: test_user
--

CREATE SEQUENCE public."provinceDays_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."provinceDays_id_seq" OWNER TO test_user;

--
-- Name: provinceDays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test_user
--

ALTER SEQUENCE public."provinceDays_id_seq" OWNED BY public."provinceDays".id;


--
-- Name: caseDates id; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."caseDates" ALTER COLUMN id SET DEFAULT nextval('public."caseDates_id_seq"'::regclass);


--
-- Name: deathDates id; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathDates" ALTER COLUMN id SET DEFAULT nextval('public."deathDates_id_seq"'::regclass);


--
-- Name: deathPersons id; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathPersons" ALTER COLUMN id SET DEFAULT nextval('public."deathPersons_id_seq"'::regclass);


--
-- Name: provinceDays id; Type: DEFAULT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."provinceDays" ALTER COLUMN id SET DEFAULT nextval('public."provinceDays_id_seq"'::regclass);


--
-- Data for Name: caseDates; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public."caseDates" (id, "provinceId", "caseDate", "caseCount") FROM stdin;
1	1	2020-04-08	782
2	2	2020-04-08	495
3	3	2020-04-08	354
4	4	2020-04-08	88
5	6	2020-04-08	21
6	5	2020-04-08	45
7	7	2020-04-08	21
8	8	2020-04-08	15
9	9	2020-04-08	13
10	10	2020-04-08	11
11	11	2020-04-06	713
12	12	2020-04-06	89
13	13	2020-04-06	32
14	14	2020-04-06	462
15	15	2020-04-06	257
16	16	2020-04-06	19
17	17	2020-04-06	18
18	18	2020-04-06	11
19	20	2020-04-06	77
20	19	2020-04-06	8
21	21	2020-04-05	704
22	22	2020-04-05	454
23	23	2020-04-05	246
24	24	2020-04-05	87
25	25	2020-04-05	31
26	26	2020-04-05	19
27	27	2020-04-05	18
28	28	2020-04-05	11
29	29	2020-04-05	8
30	30	2020-04-05	77
31	31	2020-04-04	693
32	32	2020-04-04	433
33	33	2020-04-04	232
34	35	2020-04-04	25
35	34	2020-04-04	85
36	36	2020-04-04	18
37	37	2020-04-04	18
38	38	2020-04-04	7
39	39	2020-04-04	11
40	40	2020-04-04	63
\.


--
-- Data for Name: dates; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public.dates (date, "totalCases", "totalDeaths", "totalRecoveries", "totalTests", parsed, "maybeValid", error, "dailyNew", "dailyDeaths", "updateTime") FROM stdin;
2020-04-09	1934	18	95	\N	f	f	f	89	0	2020-04-22 23:41:31.50603
2020-04-07	1749	13	95	\N	f	f	f	63	1	2020-04-22 23:41:31.50603
2020-04-03	1505	9	95	\N	f	f	f	43	4	2020-04-22 23:41:31.50603
2020-04-02	1462	5	50	\N	f	f	f	82	0	2020-04-22 23:41:31.50603
2020-04-01	1380	5	50	\N	f	f	f	27	0	2020-04-22 23:41:31.50603
2020-03-31	1353	5	31	\N	f	f	f	27	2	2020-04-22 23:41:31.50603
2020-03-30	1326	3	31	\N	f	f	f	46	1	2020-04-22 23:41:31.50603
2020-03-29	1280	2	31	\N	f	f	f	93	1	2020-04-22 23:41:31.50603
2020-03-25	709	0	12	\N	f	f	f	155	0	2020-04-22 23:41:31.50603
2020-03-28	1187	1	31	\N	f	f	f	17	0	2020-04-22 23:41:31.50603
2020-04-20	3300	58	903	121510	t	f	f	142	4	2020-04-22 23:41:31.50603
2020-04-19	3158	54	903	114711	t	f	f	124	2	2020-04-22 23:41:31.50603
2020-04-16	2605	48	903	95060	t	f	f	99	14	2020-04-22 23:41:31.50603
2020-04-21	3465	58	903	126937	t	t	f	165	0	2020-04-23 02:37:56.2214
2020-04-22	3635	65	1055	133774	t	t	f	170	7	2020-04-23 02:38:09.184444
2020-04-23	3953	75	1055	\N	t	f	f	318	10	2020-04-24 00:16:09.199594
2020-03-27	1170	1	31	\N	f	f	f	243	0	2020-04-22 23:41:31.50603
2020-03-26	927	0	12	\N	f	f	f	218	0	2020-04-22 23:41:31.50603
2020-03-24	554	0	4	\N	f	f	f	152	0	2020-04-22 23:41:31.50603
2020-03-23	402	0	4	\N	f	f	f	128	0	2020-04-22 23:41:31.50603
2020-03-22	274	0	2	\N	f	f	f	34	0	2020-04-22 23:41:31.50603
2020-03-21	240	0	2	\N	f	f	f	38	0	2020-04-22 23:41:31.50603
2020-03-20	202	0	0	\N	f	f	f	52	0	2020-04-22 23:41:31.50603
2020-03-19	150	0	0	\N	f	f	f	34	0	2020-04-22 23:41:31.50603
2020-03-18	116	0	0	\N	f	f	f	31	0	2020-04-22 23:41:31.50603
2020-03-17	85	0	0	\N	f	f	f	21	0	2020-04-22 23:41:31.50603
2020-03-16	64	0	0	\N	f	f	f	3	0	2020-04-22 23:41:31.50603
2020-03-15	61	0	0	\N	f	f	f	23	0	2020-04-22 23:41:31.50603
2020-03-14	38	0	0	\N	f	f	f	14	0	2020-04-22 23:41:31.50603
2020-03-13	24	0	0	\N	f	f	f	8	0	2020-04-22 23:41:31.50603
2020-03-12	16	0	0	\N	f	f	f	3	0	2020-04-22 23:41:31.50603
2020-03-11	13	0	0	\N	f	f	f	6	0	2020-04-22 23:41:31.50603
2020-03-10	7	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-09	7	0	0	\N	f	f	f	4	0	2020-04-22 23:41:31.50603
2020-03-08	3	0	0	\N	f	f	f	1	0	2020-04-22 23:41:31.50603
2020-03-07	2	0	0	\N	f	f	f	1	0	2020-04-22 23:41:31.50603
2020-03-06	1	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-05	1	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-04	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-03	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-02	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-03-01	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-29	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-28	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-27	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-26	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-25	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-24	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-23	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-22	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-21	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-20	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-19	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-18	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-17	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-16	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-02-15	0	0	0	\N	f	f	f	0	0	2020-04-22 23:41:31.50603
2020-04-18	3034	52	903	108021	t	f	f	251	2	2020-04-22 23:41:31.50603
2020-04-17	2783	50	903	100827	t	f	f	178	2	2020-04-22 23:41:31.50603
2020-04-08	1845	18	95	63776	t	f	f	96	5	2020-04-22 23:41:31.50603
2020-04-15	2506	34	410	90515	t	f	f	91	7	2020-04-22 23:41:31.50603
2020-04-14	2415	27	410	87022	t	f	f	143	0	2020-04-22 23:41:31.50603
2020-04-06	1686	12	95	58098	t	f	f	31	1	2020-04-22 23:41:31.50603
2020-04-05	1655	11	95	56873	t	t	f	70	2	2020-04-22 23:41:31.50603
2020-04-13	2272	27	410	\N	t	t	f	99	2	2020-04-22 23:41:31.50603
2020-04-04	1585	9	95	53937	t	t	f	80	0	2020-04-22 23:41:31.50603
2020-04-12	2173	25	410	80085	t	f	f	145	0	2020-04-22 23:41:31.50603
2020-04-11	2028	25	410	75053	t	f	f	25	1	2020-04-22 23:41:31.50603
2020-04-10	2003	24	410	73028	t	f	f	69	6	2020-04-22 23:41:31.50603
\.


--
-- Data for Name: deathDates; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public."deathDates" (id, "provinceId", "deathDate", "deathCount", "deathMenCount", "deathWomenCount") FROM stdin;
1	1	2020-04-08	3	3	0
2	2	2020-04-08	3	1	2
3	3	2020-04-08	9	5	4
4	4	2020-04-08	3	3	0
5	6	2020-04-08	0	0	0
6	5	2020-04-08	0	0	0
7	7	2020-04-08	0	0	0
8	8	2020-04-08	0	0	0
9	9	2020-04-08	0	0	0
10	10	2020-04-08	0	0	0
11	11	2020-04-06	1	1	0
12	12	2020-04-06	1	1	0
13	13	2020-04-06	0	0	0
14	14	2020-04-06	3	1	2
15	15	2020-04-06	7	3	4
16	16	2020-04-06	0	0	0
17	17	2020-04-06	0	0	0
18	18	2020-04-06	0	0	0
19	20	2020-04-06	0	0	0
20	19	2020-04-06	0	0	0
21	21	2020-04-05	1	1	0
22	22	2020-04-05	2	0	2
23	23	2020-04-05	7	3	4
24	24	2020-04-05	1	1	0
25	25	2020-04-05	0	0	0
26	26	2020-04-05	0	0	0
27	27	2020-04-05	0	0	0
28	28	2020-04-05	0	0	0
29	29	2020-04-05	0	0	0
30	30	2020-04-05	0	0	0
31	31	2020-04-04	1	1	0
32	32	2020-04-04	1	0	1
33	33	2020-04-04	6	2	4
34	35	2020-04-04	0	0	0
35	34	2020-04-04	1	1	0
36	36	2020-04-04	0	0	0
37	37	2020-04-04	0	0	0
38	38	2020-04-04	0	0	0
39	39	2020-04-04	0	0	0
40	40	2020-04-04	0	0	0
\.


--
-- Data for Name: deathPersons; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public."deathPersons" (id, "deathDateId", "provinceName", sex, "deathDate", age) FROM stdin;
\.


--
-- Data for Name: provinceDays; Type: TABLE DATA; Schema: public; Owner: test_user
--

COPY public."provinceDays" (id, "provinceName", "provDate", "caseCount", "deathCount", recovered, population, "testCount") FROM stdin;
274	GAUTENG	2020-04-10	801	3	157	\N	\N
275	WESTERN CAPE	2020-04-10	541	6	152	\N	\N
276	KWAZULU–NATAL	2020-04-10	412	12	15	\N	\N
277	FREE STATE	2020-04-10	94	3	61	\N	\N
278	EASTERN CAPE	2020-04-10	68	0	3	\N	\N
279	LIMPOPO	2020-04-10	24	0	13	\N	\N
280	MPUMALANGA	2020-04-10	20	0	6	\N	\N
281	NORTH WEST	2020-04-10	18	0	3	\N	\N
282	NORTHERN CAPE	2020-04-10	15	0	0	\N	\N
283	UNALLOCATED	2020-04-10	10	0	0	\N	\N
358	KwaZulu-Natal	2020-04-21	671	23	241	\N	\N
261	Eastern Cape	2020-04-16	220	4	19	\N	\N
356	Gauteng	2020-04-21	1199	7	843	\N	\N
328	KwaZulu-Natal	2020-04-19	617	22	241	\N	\N
256	KwaZulu-Natal	2020-04-16	539	20	241	\N	\N
295	KwaZulu-Natal	2020-04-18	604	20	241	\N	\N
378	KwaZulu-Natal	2020-04-22	758	25	241	\N	\N
398	KwaZulu-Natal	2020-04-23	807	27	241	\N	\N
383	Eastern Cape	2020-04-22	377	5	19	\N	\N
403	Eastern Cape	2020-04-23	417	6	19	\N	\N
326	Gauteng	2020-04-19	1148	6	843	\N	\N
254	Gauteng	2020-04-16	969	6	843	\N	\N
376	Gauteng	2020-04-22	1224	7	843	\N	\N
396	Gauteng	2020-04-23	1252	7	843	\N	\N
357	Western Cape	2020-04-21	1010	17	236	\N	\N
327	Western Cape	2020-04-19	868	17	236	\N	\N
255	Western Cape	2020-04-16	675	13	236	\N	\N
377	Western Cape	2020-04-22	1079	22	236	\N	\N
397	Western Cape	2020-04-23	1279	28	236	\N	\N
359	Free State	2020-04-21	106	5	76	\N	\N
329	Free State	2020-04-19	100	4	76	\N	\N
257	Free State	2020-04-16	98	4	76	\N	\N
379	Free State	2020-04-22	106	5	76	\N	\N
399	Free State	2020-04-23	106	5	76	\N	\N
332	Limpopo	2020-04-19	27	1	24	\N	\N
260	Limpopo	2020-04-16	26	1	24	\N	\N
382	Limpopo	2020-04-22	27	1	24	\N	\N
402	Limpopo	2020-04-23	27	1	24	\N	\N
335	Unallocated	2020-04-19	42	0	0	\N	\N
263	Unallocated	2020-04-16	16	0	0	\N	\N
385	Unallocated	2020-04-22	1	0	0	\N	\N
405	Unallocated	2020-04-23	1	0	0	\N	\N
361	Mpumalanga	2020-04-21	24	0	15	\N	\N
330	Mpumalanga	2020-04-19	23	0	15	\N	\N
259	Mpumalanga	2020-04-16	22	0	15	\N	\N
297	Mpumalanga	2020-04-18	25	0	15	\N	\N
381	Mpumalanga	2020-04-22	23	0	15	\N	\N
401	Mpumalanga	2020-04-23	23	0	15	\N	\N
360	North West	2020-04-21	24	0	13	\N	\N
258	North West	2020-04-16	24	0	13	\N	\N
380	North West	2020-04-22	24	0	13	\N	\N
400	North West	2020-04-23	25	0	13	\N	\N
363	Northern Cape	2020-04-21	16	0	6	\N	\N
300	Northern Cape	2020-04-18	16	0	6	\N	\N
262	Northern Cape	2020-04-16	16	0	6	\N	\N
384	Northern Cape	2020-04-22	16	0	6	\N	\N
404	Northern Cape	2020-04-23	16	0	6	\N	\N
285	KwaZulu-Natal	2020-04-17	591	20	241	\N	\N
291	Eastern Cape	2020-04-17	246	4	19	\N	\N
284	Gauteng	2020-04-17	1018	6	843	\N	\N
294	Western Cape	2020-04-18	836	15	236	\N	\N
362	Limpopo	2020-04-21	27	1	24	\N	\N
298	Limpopo	2020-04-18	26	1	24	\N	\N
331	North West	2020-04-19	24	0	13	\N	\N
287	North West	2020-04-17	24	0	13	\N	\N
333	Northern Cape	2020-04-19	16	0	6	\N	\N
364	Eastern Cape	2020-04-21	345	5	19	\N	\N
334	Eastern Cape	2020-04-19	293	4	19	\N	\N
299	Eastern Cape	2020-04-18	270	4	19	\N	\N
305	Gauteng	2020-04-18	1101	6	843	\N	\N
286	Western Cape	2020-04-17	717	15	236	\N	\N
296	Free State	2020-04-18	100	4	76	\N	\N
289	Limpopo	2020-04-17	26	1	24	\N	\N
293	Unallocated	2020-04-17	22	0	0	\N	\N
301	Unallocated	2020-04-18	32	0	0	\N	\N
308	KwaZulu-Natal	2020-04-11	418	12	241	\N	\N
337	KwaZulu-Natal	2020-04-20	639	23	241	\N	\N
306	Gauteng	2020-04-11	813	3	843	\N	\N
336	Gauteng	2020-04-20	1170	7	843	\N	\N
307	Western Cape	2020-04-11	546	7	236	\N	\N
288	Free State	2020-04-17	100	4	76	\N	\N
309	Free State	2020-04-11	94	3	76	\N	\N
339	Free State	2020-04-20	105	5	76	\N	\N
312	Limpopo	2020-04-11	23	0	24	\N	\N
315	Unallocated	2020-04-11	10	0	0	\N	\N
367	Unallocated	2020-04-21	43	0	0	\N	\N
311	Mpumalanga	2020-04-11	20	0	15	\N	\N
341	Mpumalanga	2020-04-20	23	0	15	\N	\N
302	North West	2020-04-18	24	0	13	\N	\N
310	North West	2020-04-11	19	0	13	\N	\N
292	Northern Cape	2020-04-17	16	0	6	\N	\N
313	Northern Cape	2020-04-11	16	0	6	\N	\N
344	Northern Cape	2020-04-20	18	0	6	\N	\N
314	Eastern Cape	2020-04-11	69	0	19	\N	\N
342	Eastern Cape	2020-04-20	310	5	19	\N	\N
338	Western Cape	2020-04-20	940	17	236	\N	\N
345	Unallocated	2020-04-20	43	0	0	\N	\N
290	Mpumalanga	2020-04-17	23	0	15	\N	\N
340	North West	2020-04-20	25	0	13	\N	\N
343	Limpopo	2020-04-20	27	1	24	\N	\N
63	KwaZulu-Natal	2020-04-13	465	12	241	\N	\N
73	KwaZulu-Natal	2020-04-14	489	12	241	\N	\N
53	KwaZulu-Natal	2020-04-12	443	12	241	\N	\N
57	Eastern Cape	2020-04-12	88	0	19	\N	\N
88	Eastern Cape	2020-04-15	199	0	19	\N	\N
81	Gauteng	2020-04-15	930	5	843	\N	\N
61	Gauteng	2020-04-13	890	4	843	\N	\N
71	Gauteng	2020-04-14	909	4	843	\N	\N
51	Gauteng	2020-04-12	865	3	843	\N	\N
62	Western Cape	2020-04-13	617	8	236	\N	\N
82	Western Cape	2020-04-15	657	8	236	\N	\N
52	Western Cape	2020-04-12	587	7	236	\N	\N
64	Free State	2020-04-13	96	3	76	\N	\N
84	Free State	2020-04-15	97	3	76	\N	\N
56	Free State	2020-04-12	96	3	76	\N	\N
67	Limpopo	2020-04-13	23	0	24	\N	\N
58	Limpopo	2020-04-12	23	0	24	\N	\N
87	Limpopo	2020-04-15	25	0	24	\N	\N
80	Unallocated	2020-04-14	18	0	0	\N	\N
33	KWAZULU–NATAL	2020-04-04	232	6	0	\N	\N
34	FREE STATE	2020-04-04	85	1	0	\N	\N
35	EASTERN CAPE	2020-04-04	25	0	0	\N	\N
36	LIMPOPO	2020-04-04	18	0	0	\N	\N
37	MPUMALANGA	2020-04-04	18	0	0	\N	\N
38	NORTHERN CAPE	2020-04-04	7	0	0	\N	\N
39	NORTH WEST	2020-04-04	11	0	0	\N	\N
40	UNALLOCATED	2020-04-04	63	0	0	\N	\N
60	Unallocated	2020-04-12	15	0	0	\N	\N
66	Mpumalanga	2020-04-13	22	0	15	\N	\N
75	Mpumalanga	2020-04-14	22	0	15	\N	\N
86	Mpumalanga	2020-04-15	22	0	15	\N	\N
55	Mpumalanga	2020-04-12	21	0	15	\N	\N
65	North West	2020-04-13	22	0	13	\N	\N
76	North West	2020-04-14	22	0	13	\N	\N
54	North West	2020-04-12	19	0	13	\N	\N
78	Northern Cape	2020-04-14	16	0	6	\N	\N
59	Northern Cape	2020-04-12	16	0	6	\N	\N
1	GAUTENG	2020-04-08	782	3	0	\N	\N
2	WESTERN CAPE	2020-04-08	495	3	0	\N	\N
3	KWAZULU–NATAL	2020-04-08	354	9	0	\N	\N
4	FREE STATE	2020-04-08	88	3	0	\N	\N
5	EASTERN CAPE	2020-04-08	45	0	0	\N	\N
6	LIMPOPO	2020-04-08	21	0	0	\N	\N
7	MPUMALANGA	2020-04-08	21	0	0	\N	\N
8	NORTH WEST	2020-04-08	15	0	0	\N	\N
9	NORTHERN CAPE	2020-04-08	13	0	0	\N	\N
10	UNALLOCATED	2020-04-08	11	0	0	\N	\N
11	GAUTENG	2020-04-06	713	1	0	\N	\N
12	FREE STATE	2020-04-06	89	1	0	\N	\N
13	EASTERN CAPE	2020-04-06	32	0	0	\N	\N
14	WESTERN CAPE	2020-04-06	462	3	0	\N	\N
15	KWAZULU–NATAL	2020-04-06	257	7	0	\N	\N
16	LIMPOPO	2020-04-06	19	0	0	\N	\N
17	MPUMALANGA	2020-04-06	18	0	0	\N	\N
18	NORTH WEST	2020-04-06	11	0	0	\N	\N
20	UNALLOCATED	2020-04-06	77	0	0	\N	\N
19	NORTHERN CAPE	2020-04-06	8	0	0	\N	\N
21	GAUTENG	2020-04-05	704	1	0	\N	\N
22	WESTERN CAPE	2020-04-05	454	2	0	\N	\N
23	KWAZULU–NATAL	2020-04-05	246	7	0	\N	\N
24	FREE STATE	2020-04-05	87	1	0	\N	\N
25	EASTERN CAPE	2020-04-05	31	0	0	\N	\N
26	LIMPOPO	2020-04-05	19	0	0	\N	\N
27	MPUMALANGA	2020-04-05	18	0	0	\N	\N
28	NORTH WEST	2020-04-05	11	0	0	\N	\N
29	NORTHERN CAPE	2020-04-05	8	0	0	\N	\N
30	UNALLOCATED	2020-04-05	77	0	0	\N	\N
31	GAUTENG	2020-04-04	693	1	0	\N	\N
32	WESTERN CAPE	2020-04-04	433	1	0	\N	\N
83	KwaZulu-Natal	2020-04-15	519	18	241	\N	\N
68	Eastern Cape	2020-04-13	104	0	19	\N	\N
79	Eastern Cape	2020-04-14	174	0	19	\N	\N
72	Western Cape	2020-04-14	643	8	236	\N	\N
74	Free State	2020-04-14	98	3	76	\N	\N
77	Limpopo	2020-04-14	24	0	24	\N	\N
70	Unallocated	2020-04-13	17	0	0	\N	\N
89	Unallocated	2020-04-15	18	0	0	\N	\N
85	North West	2020-04-15	23	0	13	\N	\N
69	Northern Cape	2020-04-13	16	0	6	\N	\N
90	Northern Cape	2020-04-15	16	0	6	\N	\N
\.


--
-- Name: caseDates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."caseDates_id_seq"', 40, true);


--
-- Name: deathDates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."deathDates_id_seq"', 40, true);


--
-- Name: deathPersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."deathPersons_id_seq"', 1, false);


--
-- Name: provinceDays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test_user
--

SELECT pg_catalog.setval('public."provinceDays_id_seq"', 415, true);


--
-- Name: caseDates caseDates_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."caseDates"
    ADD CONSTRAINT "caseDates_pkey" PRIMARY KEY (id);


--
-- Name: caseDates casedates_provinceid_casedate_unique; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."caseDates"
    ADD CONSTRAINT casedates_provinceid_casedate_unique UNIQUE ("provinceId", "caseDate");


--
-- Name: dates dates_date_unique; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT dates_date_unique UNIQUE (date);


--
-- Name: dates dates_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public.dates
    ADD CONSTRAINT dates_pkey PRIMARY KEY (date);


--
-- Name: deathDates deathDates_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathDates"
    ADD CONSTRAINT "deathDates_pkey" PRIMARY KEY (id);


--
-- Name: deathPersons deathPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathPersons"
    ADD CONSTRAINT "deathPersons_pkey" PRIMARY KEY (id);


--
-- Name: deathDates deathdates_provinceid_deathdate_unique; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathDates"
    ADD CONSTRAINT deathdates_provinceid_deathdate_unique UNIQUE ("provinceId", "deathDate");


--
-- Name: deathPersons deathpersons_provincename_deathdateid_deathdate_age_sex_unique; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathPersons"
    ADD CONSTRAINT deathpersons_provincename_deathdateid_deathdate_age_sex_unique UNIQUE ("provinceName", "deathDateId", "deathDate", age, sex);


--
-- Name: provinceDays provinceDays_pkey; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."provinceDays"
    ADD CONSTRAINT "provinceDays_pkey" PRIMARY KEY (id);


--
-- Name: provinceDays provincedays_provincename_provdate_unique; Type: CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."provinceDays"
    ADD CONSTRAINT provincedays_provincename_provdate_unique UNIQUE ("provinceName", "provDate");


--
-- Name: dates set_timestamp; Type: TRIGGER; Schema: public; Owner: test_user
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.dates FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: caseDates casedates_provinceid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."caseDates"
    ADD CONSTRAINT casedates_provinceid_foreign FOREIGN KEY ("provinceId") REFERENCES public."provinceDays"(id);


--
-- Name: deathDates deathdates_provinceid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathDates"
    ADD CONSTRAINT deathdates_provinceid_foreign FOREIGN KEY ("provinceId") REFERENCES public."provinceDays"(id);


--
-- Name: deathPersons deathpersons_deathdateid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: test_user
--

ALTER TABLE ONLY public."deathPersons"
    ADD CONSTRAINT deathpersons_deathdateid_foreign FOREIGN KEY ("deathDateId") REFERENCES public."provinceDays"(id);


--
-- PostgreSQL database dump complete
--

