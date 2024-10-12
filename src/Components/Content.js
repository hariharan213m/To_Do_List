
import { MdDelete } from "react-icons/md";

const Content = ({items,handleCheck,handleDelete}) => {
 
  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.item}
              </label>
              <MdDelete onClick={() => handleDelete(item.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "13rem" }}>Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
