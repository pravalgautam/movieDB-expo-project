import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-4">
    <Text className="text-neutral-400 font-medium text-sm">{label}</Text>
    <Text className="text-white font-bold text-sm mt-1">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Poster Image */}
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
          <TouchableOpacity className="absolute bottom-5 right-5 bg-white size-14 rounded-full items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        {/* Movie Details */}
        <View className="px-5 mt-4">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>

          <View className="flex-row items-center space-x-2 mt-2">
            <Text className="text-neutral-400 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-neutral-400 text-sm">•</Text>
            <Text className="text-neutral-400 text-sm">
              {movie?.runtime} mins
            </Text>
          </View>

          <View className="flex-row items-center bg-neutral-800 px-2 py-1 rounded-md space-x-2 mt-2">
            <Image source={icons.star} className="w-4 h-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-neutral-400 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ")}
          />

          <View className="flex-row justify-between w-full mt-4 space-x-4">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000}M`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )}M`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies
              ?.map((c) => c.name)
              .join(" • ")}
          />
        </View>
      </ScrollView>

      {/* Go Back Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-5 right-5 bg-indigo-600 rounded-lg py-4 flex-row items-center justify-center"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="w-5 h-5 mr-2 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;
