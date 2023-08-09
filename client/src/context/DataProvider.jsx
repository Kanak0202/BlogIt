import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children })=>{

    const [account, setAccount] = useState({username:'', name:''});
    // console.log(account);
    return (
        <DataContext.Provider value={{ account, setAccount }}>
        {children} 
        </DataContext.Provider>
    )
    //children can access the acccount values where children are any components that are enclosed within DataProvider
    //By wrapping components with the DataProvider, any nested components that are descendants of the DataProvider component can access the account state and setAccount function using the useContext hook and importing the DataContext.


}

export default DataProvider;