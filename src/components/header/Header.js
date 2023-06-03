import React from 'react'

const Header = () => {
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Solar Ladder </span>
          <span className="--color-danger">Books</span>
        </h3>
        <button className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
}

export default Header