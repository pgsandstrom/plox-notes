CREATE TABLE public.note
(
  id text,
  data jsonb,
    CONSTRAINT note_id_key UNIQUE (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.note
  OWNER TO postgres;

