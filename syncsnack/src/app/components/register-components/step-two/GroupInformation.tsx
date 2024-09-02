import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function GroupInformation({ formData, handleInputChange }: any) {
  const t = useTranslations("StepTwoGroupInformaiton");

  return (
    <>
      <FormControl className="mb-4">
        <FormLabel>{t("GroupChoice")}</FormLabel>
        <RadioGroup
          name="groupChoice"
          value={formData.groupChoice}
          onChange={handleInputChange}
        >
          <Stack direction="row">
            <Radio value="join">{t("JoinGroup")}</Radio>
            <Radio value="create">{t("CreateGroup")}</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {formData.groupChoice === "join" && (
        <>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupName")}</FormLabel>
            <Input
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupPassword")}</FormLabel>
            <Input
              name="groupPassword"
              value={formData.groupPassword}
              onChange={handleInputChange}
              type="password"
            />
          </FormControl>
        </>
      )}
      {formData.groupChoice === "create" && (
        <>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupName")}</FormLabel>
            <Input
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupDescription")}</FormLabel>
            <Input
              name="groupDescription"
              value={formData.groupDescription}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupPassword")}</FormLabel>
            <Input
              name="groupPassword"
              value={formData.groupPassword}
              onChange={handleInputChange}
              type="password"
            />
          </FormControl>
        </>
      )}
    </>
  );
}

