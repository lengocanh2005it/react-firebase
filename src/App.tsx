import Auth from "./components/Auth";
import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { db, auth, storage } from "./config/firebaseConfig";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

interface FormType {
  title: string;
  release: number;
}

const App = () => {
  const [movies, setMovies] = useState<{ [key: string]: string | number }[]>(
    []
  );
  const [formData, setFormData] = useState<FormType>({
    title: "",
    release: 0,
  });
  const [isReceived, setIsReceived] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");

  // file upload state
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(collection(db, "movies"));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovies(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieList();
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "movies"), {
        title: formData.title,
        releaseDate: formData.release,
        receivedOscar: isReceived,
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateMovieTitle = async (movieId: string | number) => {
    try {
      const movieDoc = doc(db, "movies", movieId as string);
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (movieId: string | number) => {
    const movieDoc = doc(db, "movies", movieId as string);
    try {
      await deleteDoc(movieDoc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Release Date"
          name="release"
          onChange={handleChange}
        />
        <input
          type="checkbox"
          id="received"
          name="received"
          checked={isReceived}
          onChange={(e) => {
            setIsReceived(e.target.checked);
          }}
        />
        <label htmlFor="received">Received An Oscar</label>
        <button onClick={handleSubmit}>Submit Movie</button>
      </div>

      <div>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h1>{movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
              <input
                type="text"
                placeholder="New title..."
                onChange={(e) => {
                  setUpdatedTitle(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  updateMovieTitle(movie.id);
                }}
              >
                Update Title
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => {
            setFileUpload((e.target.files as FileList)[0]);
          }}
        />
        <button onClick={handleUploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default App;
