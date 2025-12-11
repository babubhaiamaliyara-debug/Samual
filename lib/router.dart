import 'package:code/features/auth/login_screen.dart';
import 'package:code/features/dashboard/dashboard_screen.dart';
import 'package:code/features/game/game_screen.dart';
import 'package:code/features/leaderboard/leaderboard_screen.dart';
import 'package:code/features/profile/profile_screen.dart';
import 'package:go_router/go_router.dart';

final router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/game',
      builder: (context, state) => const GameScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/leaderboard',
      builder: (context, state) => const LeaderboardScreen(),
    ),
  ],
);
