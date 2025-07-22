export async function sendRequest(data) {
  const url = "http://localhost:3000/books";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const bookDataResponse = await response.json();
  return bookDataResponse;
}

export async function fetchBookData(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedQuery}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch BookData");
    }
    const bookDataResponse = await response.json();
    console.log(bookDataResponse);
    const finalBookData = bookDataResponse.items
      ? bookDataResponse.items.slice(0, 5)
      : [];
    return finalBookData.map((item) => {
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors[0]
          : "Unknown Author",
        cover: item.volumeInfo.imageLinks?.thumbnail,
      };
    });
  } catch (e) {
    console.error(e);
  }
}

export async function loadAllBooks() {
  const url = "http://localhost:3000/books";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch books data. Restart Backend");
  }
  const bookDataResponse = await response.json();
  return bookDataResponse;
}

export async function deleteBook(id) {
  const url = `http://localhost:3000/books/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      contentType: "application/json",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    const bookDataResponse = await response.json();
    return bookDataResponse;
  } catch (e) {
    return e;
  }
}


export async function updateBook(id, data) {
  const url = `http://localhost:3000/books/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if(!response.ok){
    throw new Error("Failed to update book");
  }
  const bookDataResponse = await response.json();
  return bookDataResponse;
}