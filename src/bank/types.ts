// Формат банка заданий. Подробное описание — в docs/bank-format.md.

export type Section = 'listening' | 'grammar' | 'reading';

export interface Tags {
  /** 1–5. 1 — отсеяно, 2 — доп. материалы, 3–5 — основная база */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** 1–5: насколько редко встречается этот подвох / тема */
  rarity?: 1 | 2 | 3 | 4 | 5;
  /** лексическая тема по кодификатору ФИПИ */
  topic: string;
  /** основной уровень лексики */
  vocab: 'A1' | 'A2' | 'B1' | 'B2';
}

export interface Trap {
  /** код типа подвоха из реестра, например «А-3» */
  code?: string;
  /** название, которое видит ученик: объясняет сам подвох */
  name: string;
}

export interface Option {
  text: string;
  /** пометка учителя под вариантом в разборе */
  note: string;
  /** серая пометка: вариант не связан с подвохом */
  quiet?: boolean;
}

/** Шаг голосового объяснения: один кусок записи и одна пометка на экране */
export interface Step {
  /** что говорит голос (субтитр) */
  say: string;
  /** 'en' — английская цитата из записи */
  lang?: 'en';
  /** на что смотрит экран: 'question', 'f1', 'o2', 'trap' */
  focus?: string;
  /** что проявляется на этом шаге: 'f1.ev', 'f2.lure', 'o1', 'trap' */
  show?: string[];
  /** файл озвучки шага; если нет — шаг идёт по субтитрам */
  audio?: string;
}

export interface Fragment {
  id: string;
  /** с какой секунды записи начинается реплика */
  at: number;
  /** где она кончается */
  to: number;
  who: string;
  /** текст с разметкой [[ev:доказательство]] и [[lure:приманка]] */
  text: string;
}

export interface TranscriptLine {
  t: number;
  who: string;
  text: string;
  key?: 'q' | 'a';
}

export interface Segment {
  from: number;
  to: number;
  kind: 'q' | 'a';
}

interface TaskBase {
  id: string;
  /** демо-задание из макета, не из ФИПИ */
  demo?: boolean;
  section: Section;
  /** номер задания ЕГЭ */
  examTask: number;
  /** источник: банк ФИПИ, сборник Вербицкой и т. п. */
  source?: string;
  tags: Tags;
  trap: Trap;
  question: string;
  options: Option[];
  /** номер верного варианта, с 1 */
  answer: number;
}

export interface ListeningTask extends TaskBase {
  section: 'listening';
  audio: {
    src: string;
    duration: number;
    segments: Segment[];
  };
  transcript: TranscriptLine[];
  review: {
    fragments: Fragment[];
    steps: Step[];
  };
}

export type Task = ListeningTask;
