CREATE DATABASE youtubetest;
\c youtubetest;
GRANT ALL PRIVILEGES ON DATABASE "youtubetest" to postgres;

CREATE TABLE public.url_video (
                url_video_url VARCHAR NOT NULL,
                url_video_bookmark BOOLEAN NOT NULL,
                CONSTRAINT url_video_id PRIMARY KEY (url_video_url)
);


CREATE SEQUENCE public.url_history_url_history_id_seq;

CREATE TABLE public.url_history (
                url_history_id INTEGER NOT NULL DEFAULT nextval('public.url_history_url_history_id_seq'),
                url_history_time TIMESTAMP NOT NULL,
                url_video_url VARCHAR NOT NULL,
                CONSTRAINT url_history_id PRIMARY KEY (url_history_id)
);


ALTER SEQUENCE public.url_history_url_history_id_seq OWNED BY public.url_history.url_history_id;

ALTER TABLE public.url_history ADD CONSTRAINT url_video_url_history_fk
FOREIGN KEY (url_video_url)
REFERENCES public.url_video (url_video_url)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

INSERT INTO url_video (url_video_url, url_video_bookmark)
VALUES ('https://www.youtube.com/watch?v=BJL3z4c0F70', true);

INSERT INTO url_history (url_history_time, url_video_url)
VALUES (current_timestamp(3), 'https://www.youtube.com/watch?v=BJL3z4c0F70');