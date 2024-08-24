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

export default function Home() {
  return (
    <Stack
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(3,5,12,255)",
        color: "rgba(255,255,255,255)",
      }}
      p={2}
      gap={2}
    >
      <Box
        display={"flex"}
        minWidth={"max-content"}
        textAlign={"center"}
        sx={{ p: 1 }}
        flexDirection={"column"}
      >
        <Typography variant="h4">TransMark Dashboard</Typography>
        <Typography variant="h6">
          Your Transcript, Your Marks, Your Way.
        </Typography>
      </Box>
      <Box width={"80vw"}>
        <Grid container display={"flex"} direction={"row"} spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "rgba(255,245,0,255)" }}>
              <CardContent>
                <Box
                  component={"button"}
                  width={"100%"}
                  height={"100%"}
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
            <Card sx={{ backgroundColor: "rgba(255,245,0,255)" }}>
              <CardContent>
                <Box
                  component={"button"}
                  width={"100%"}
                  height={"100%"}
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
            <Card sx={{ backgroundColor: "rgba(255,245,0,255)" }}>
              <CardContent>
                <Box
                  component={"button"}
                  width={"100%"}
                  height={"100%"}
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
    </Stack>
  );
}
