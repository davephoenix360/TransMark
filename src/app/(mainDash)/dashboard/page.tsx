import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import CreateIcon from "@mui/icons-material/Create";
import NotesIcon from "@mui/icons-material/Notes";
import InsightsIcon from "@mui/icons-material/Insights";
import Footer from "../../../componenets/Footer";
import Navbar from "../../../componenets/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{
          backgroundColor: "rgba(3,5,12,255)",
          color: "rgba(255,255,255,255)",
        }}
        minHeight={"60vh"}
        p={2}
        gap={2}
      >
        <Box
          display={"flex"}
          textAlign={"center"}
          sx={{ p: 2 }}
          flexDirection={"column"}
        >
          <Typography variant="h4">TransMark Dashboard</Typography>
          <Typography variant="h6">
            Your Transcript, Your Marks, Your Way.
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} sx={{ p: 2 }}>
          <Grid container display={"flex"} direction={"row"} spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                component={"button"}
                sx={{ backgroundColor: "rgba(255,245,0,255)", width: "100%" }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <CreateIcon />
                    <Typography>Create a Transcript</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                component={"button"}
                sx={{ backgroundColor: "rgba(255,245,0,255)", width: "100%" }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <NotesIcon />
                    <Typography>Your Transcripts</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                component={"button"}
                sx={{ backgroundColor: "rgba(255,245,0,255)", width: "100%" }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={2}
                    justifyContent={"center"}
                  >
                    <InsightsIcon />
                    <Typography>Analyze Your Transcript</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box width={"90%"} p={2}>
          <Grid container display={"flex"} direction={"row"} spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "rgba(23,23,26,255)",
                  color: "rgba(255,255,255,255)",
                }}
              >
                <CardContent>
                  <Stack direction={"column"} gap={1}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Recent Changes to Transcripts
                    </Typography>
                    <Typography sx={{ color: "rgba(117,117,119,255)" }}>
                      David added Change 1 on {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography sx={{ color: "rgba(117,117,119,255)" }}>
                      Rudix added Change 2 on {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography sx={{ color: "rgba(117,117,119,255)" }}>
                      Rohit added Change 3 on {new Date().toLocaleDateString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
