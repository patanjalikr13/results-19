import "@mantine/core/styles.css";
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme";
import MainApp from "./MainApp.tsx";

export default function App() {
    return <MantineProvider theme={theme}>


        <div style={{
            padding: '32px'
        }}>
            <MainApp/>

        </div>


    </MantineProvider>;
}
