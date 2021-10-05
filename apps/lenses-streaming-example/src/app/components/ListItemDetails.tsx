import React from "react";
import Button from "./Button";
import { Message } from "../config/state";

interface IData {
  label: string;
  value: string;
}

const ListItemDetailsRow = ({ label, value }: IData) => (
  <li>
    <strong>{label}</strong>: {value}
  </li>
);

export type ListItemDetailsProps = {
  message: Message;
  onShowRowDetails: (message: Message) => void;
  onCommitMessage: (message: Message) => void;
};

const ListItemDetails: React.FC<ListItemDetailsProps> = ({
  message = {},
  onShowRowDetails,
  onCommitMessage,
}) => {
  const commitMessage = (message?: Message) => {
    return () => {
      if (message) {
        onCommitMessage(message);
      }
    };
  };

  const clearSelectedItem = () => {
    onShowRowDetails({});
  };

  const arr: IData[] = [];

  const { value } = message;
  if (value) {
    Object.keys(JSON.parse(value)).forEach(function (k) {
      arr.push({ label: k, value: JSON.parse(value)[k] });
    });
  }
  return (
    <div>
      {arr.length > 0 ? (
        <div className="notification content list-item-details">
          <ul>
            {arr.map((item) => (
              <ListItemDetailsRow
                key={item.label}
                label={item.label}
                value={item.value ? String(item.value) : item.value}
              />
            ))}
          </ul>
          <Button
            className="button is-info is-small"
            onClick={commitMessage(message)}
          >
            Commit
          </Button>
          <Button
            className="button is-white is-small"
            onClick={clearSelectedItem}
          >
            Hide details
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListItemDetails;
