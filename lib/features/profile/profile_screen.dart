import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:lucide_icons/lucide_icons.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 50,
              backgroundColor: Colors.deepPurpleAccent,
              child: Icon(LucideIcons.user, size: 50, color: Colors.white),
            ),
            const Gap(16),
            Text(
              'Player One',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            Text('Level 5 Explorer', style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.grey)),
            const Gap(32),
            _buildStatRow(context),
            const Gap(32),
            const Divider(),
            const Gap(16),
            _buildSettingItem(context, 'Edit Profile', LucideIcons.edit),
            _buildSettingItem(context, 'Notifications', LucideIcons.bell),
            _buildSettingItem(context, 'Sound & Music', LucideIcons.music),
            _buildSettingItem(context, 'Language', LucideIcons.globe),
            _buildSettingItem(context, 'Logout', LucideIcons.logOut, isDestructive: true),
          ],
        ),
      ),
    );
  }

  Widget _buildStatRow(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildStatItem(context, 'Best Score', '12,400'),
        _buildStatItem(context, 'Games Played', '42'),
        _buildStatItem(context, 'Rank', '#12'),
      ],
    );
  }

  Widget _buildStatItem(BuildContext context, String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.primary,
              ),
        ),
        const Gap(4),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }

  Widget _buildSettingItem(BuildContext context, String title, IconData icon, {bool isDestructive = false}) {
    return ListTile(
      leading: Icon(icon, color: isDestructive ? Colors.redAccent : null),
      title: Text(
        title,
        style: TextStyle(
          color: isDestructive ? Colors.redAccent : null,
          fontWeight: isDestructive ? FontWeight.bold : null,
        ),
      ),
      trailing: const Icon(LucideIcons.chevronRight, size: 16),
      onTap: () {},
    );
  }
}
