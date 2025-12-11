import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:gap/gap.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.trophy),
            onPressed: () => context.push('/leaderboard'),
          ),
          IconButton(
            icon: const Icon(LucideIcons.user),
            onPressed: () => context.push('/profile'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildWelcomeCard(context),
            const Gap(30),
            Text('Quick Play', style: Theme.of(context).textTheme.headlineSmall),
            const Gap(16),
            _buildGameCard(context, 'Space Shooter', 'Level 5', LucideIcons.rocket),
            const Gap(16),
            _buildGameCard(context, 'Puzzle Master', 'Level 2', LucideIcons.puzzle),
            const Gap(30),
            Text('Recent Activity', style: Theme.of(context).textTheme.headlineSmall),
            const Gap(16),
            _buildRecentItem('Space Shooter', 'High Score: 12,400'),
            _buildRecentItem('Puzzle Master', 'Completed Level 1'),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push('/game'),
        icon: const Icon(LucideIcons.play),
        label: const Text('Play Now'),
        backgroundColor: Theme.of(context).colorScheme.secondary,
        foregroundColor: Colors.black,
      ),
    );
  }

  Widget _buildWelcomeCard(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Theme.of(context).colorScheme.primary,
            Theme.of(context).colorScheme.tertiary,
          ],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ready to play, Player?',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const Gap(8),
          const Text(
            'Beat your best score today!',
            style: TextStyle(color: Colors.white70),
          ),
        ],
      ),
    );
  }

  Widget _buildGameCard(BuildContext context, String title, String subtitle, IconData icon) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => context.push('/game'),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, size: 32, color: Theme.of(context).colorScheme.primary),
              ),
              const Gap(16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold)),
                    Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
              ),
              const Icon(LucideIcons.chevronRight),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRecentItem(String title, String subtitle) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: const Icon(LucideIcons.history),
      title: Text(title),
      subtitle: Text(subtitle),
    );
  }
}
