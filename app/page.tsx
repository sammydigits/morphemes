"use client";

import {
  RadioGroup,
  Badge,
  Select,
  SelectItem,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { title } from "@/components/primitives";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { SectionWrapper } from "@/components/section-wrapper";
import { CustomRadio } from "@/components/custom-radio";

export const prefixes = [
  {
    value: "as",
  },
  {
    value: "de",
  },
  {
    value: "re",
  },
];

export const baseWords = [
  {
    label: "Sign",
    value: "sign",
    latin: "signare",
    description: "mark, print or motion of the hand",
    requiresSubscription: false,
  },
  {
    label: "Ject",
    value: "ject",
    latin: "latin needed here",
    description: "description needed here",
    requiresSubscription: true,
  },
  {
    label: "Example2",
    value: "example2",
    latin: "latin needed here",
    description: "description needed here",
    requiresSubscription: true,
  },
  {
    label: "Example3",
    value: "example3",
    latin: "latin needed here",
    description: "description needed here",
    requiresSubscription: true,
  },
];

export const suffixes = [
  {
    value: "al",
  },
  {
    value: "ed",
  },
  {
    value: "er",
  },
  {
    value: "ing",
  },
  {
    value: "ment",
  },
];

export default function Home() {
  const validWords = new Set([
    "assign",
    "design",
    "resign",
    "resignment",
    "signed",
    "signing",
    "signal",
    "assign",
    "assigned",
    "assigner",
    "assigning",
    "assignment",
    "resigned",
    "resigning",
    "designing",
    "designer",
    "designed",
  ]);
  const [prefix, setPrefix] = useState("");
  const [base] = useState(baseWords[0].value);
  const [suffix, setSuffix] = useState("");
  const [builtWords, setBuiltWords] = useState<any>(new Set([]));
  const [word, setWord] = useState(baseWords[0].value);
  const isWordValid = validWords.has(word);
  const hasPrefixOrSuffix = prefix.length > 0 || suffix.length > 0;
  const wordStatus = isWordValid
    ? "success"
    : hasPrefixOrSuffix
    ? "danger"
    : "default";
  const wordsRequiringSubscription = baseWords
    .filter((word) => word.requiresSubscription)
    .map((word) => word.value);

  const handleSetPrefix = (newPrefix: string) => {
    setPrefix(newPrefix);
    const newWord = newPrefix + base + suffix;
    setWord(newWord);
    if (validWords.has(newWord)) {
      setBuiltWords(new Set([...builtWords, newWord]));
    }
  };

  const handleClearPrefix = () => {
    setPrefix("");
    const newWord = base + suffix;
    setWord(newWord);
    if (validWords.has(newWord)) {
      setBuiltWords(new Set([...builtWords, newWord]));
    }
  };

  const handleSetSuffix = (newSuffix: string) => {
    setSuffix(newSuffix);
    const newWord = prefix + base + newSuffix;
    setWord(newWord);
    if (validWords.has(newWord)) {
      setBuiltWords(new Set([...builtWords, newWord]));
    }
  };

  const handleClearSuffix = () => {
    setSuffix("");
    const newWord = prefix + base;
    setWord(newWord);
    if (validWords.has(newWord)) {
      setBuiltWords(new Set([...builtWords, newWord]));
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h2 className="mb-16 mt-8 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
          How many words can you build from these morphemes?
        </h2>
      </div>
      <section
        id="sections"
        className="grid grid-cols-[200px_400px_200px_1fr] gap-1"
      >
        <SectionWrapper bordercolor={"default"}>
          <div className="flex justify-between content-center py-4 mb-4 border-b-1 border-gray-200">
            <p className="text-lg text-primary">Prefix</p>
            <div className="closeChipContainer">
              <Chip onClose={handleClearPrefix} variant="flat" />
            </div>
          </div>
          <RadioGroup
            onValueChange={(prefix) => handleSetPrefix(prefix)}
            value={prefix}
          >
            {prefixes.map((prefix) => (
              <CustomRadio key={prefix.value} value={prefix.value}>
                {prefix.value}
              </CustomRadio>
            ))}
          </RadioGroup>
        </SectionWrapper>

        <SectionWrapper bordercolor={"default"}>
          <div className="flex justify-between content-center py-4 mb-4 border-b-1 border-gray-200">
            <p className="text-lg text-primary">Base</p>
            <div className="baseSelectWidth">
              <Select
                size="sm"
                label=""
                aria-label="base word"
                variant="flat"
                selectedKeys={[base]}
                disabledKeys={wordsRequiringSubscription}
              >
                {baseWords.map((word) => (
                  <SelectItem
                    key={word.value}
                    value={word.value}
                    startContent={
                      word.requiresSubscription && (
                        <Avatar
                          alt="requires subscription"
                          className="w-6 h-6"
                          src="/padlock.png"
                        />
                      )
                    }
                  >
                    {word.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold pt-8 pb-4">
              {baseWords[0].value}
            </h2>
            <p className="italic pb-4">
              Latin &apos;{baseWords[0].latin}&apos;
            </p>
            <p>{baseWords[0].description}</p>
          </div>
        </SectionWrapper>

        <SectionWrapper bordercolor={"default"}>
          <div className="flex justify-between content-center py-4 mb-4 border-b-1 border-gray-200">
            <p className="text-lg text-primary">Suffix</p>
            <div className="closeChipContainer">
              <Chip onClose={handleClearSuffix} variant="flat" />
            </div>
          </div>

          <RadioGroup
            onValueChange={(suffix) => handleSetSuffix(suffix)}
            value={suffix}
          >
            {suffixes.map((sufffix) => (
              <CustomRadio key={sufffix.value} value={sufffix.value}>
                {sufffix.value}
              </CustomRadio>
            ))}
          </RadioGroup>
        </SectionWrapper>

        <SectionWrapper bordercolor={wordStatus}>
          <div className="flex justify-between content-center py-4 mb-4 border-b-1 border-gray-200">
            <p className="text-lg text-primary">Words built</p>
            <Chip
              color={
                builtWords.size === validWords.size ? "success" : "default"
              }
            >
              {builtWords.size}/{validWords.size}
            </Chip>
          </div>
          <div className="flex justify-center mt-16">
            <Badge
              isOneChar
              content={wordStatus === "success" ? <CheckIcon /> : "x"}
              color={wordStatus === "success" ? "success" : "danger"}
              placement="top-right"
              size="lg"
              isInvisible={!hasPrefixOrSuffix}
              className="top-[-5%] right-[-5%]"
            >
              <h1 className={title()}>
                <span className={wordStatus === "danger" ? "wavyRed" : ""}>
                  {word}
                </span>
              </h1>
            </Badge>
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}
