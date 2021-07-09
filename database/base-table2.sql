--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-07-02 22:22:03

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 202 (class 1259 OID 16513)
-- Name: sensors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sensors_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16497)
-- Name: sensors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensors (
    id integer DEFAULT nextval('public.sensors_id_seq'::regclass) NOT NULL,
    latitude double precision,
    longitude double precision,
    access_token text,
    token_expire timestamp(0) without time zone
);


ALTER TABLE public.sensors OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16505)
-- Name: telemetry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.telemetry (
    sensor_id integer NOT NULL,
    temperature real,
    humidity real,
    date_time timestamp(0) without time zone
);


ALTER TABLE public.telemetry OWNER TO postgres;

--
-- TOC entry 2989 (class 0 OID 16497)
-- Dependencies: 200
-- Data for Name: sensors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sensors VALUES (1, 0, 0, 'bhre89fu0hkrb3heus8', NULL);


--
-- TOC entry 2990 (class 0 OID 16505)
-- Dependencies: 201
-- Data for Name: telemetry; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 202
-- Name: sensors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sensors_id_seq', 1, true);


--
-- TOC entry 2857 (class 2606 OID 16504)
-- Name: sensors sensors_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT sensors_pk PRIMARY KEY (id);


--
-- TOC entry 2858 (class 2606 OID 16508)
-- Name: telemetry telemetry_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telemetry
    ADD CONSTRAINT telemetry_fk FOREIGN KEY (sensor_id) REFERENCES public.sensors(id) ON DELETE CASCADE;


-- Completed on 2021-07-02 22:22:03

--
-- PostgreSQL database dump complete
--

