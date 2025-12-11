import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:gap/gap.dart';
import 'package:lucide_icons/lucide_icons.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF2E1065), Color(0xFF0F172A)],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(LucideIcons.gamepad2, size: 80, color: Colors.cyanAccent),
                const Gap(20),
                Text(
                  'GAMEVERSE',
                  style: Theme.of(context).textTheme.displayMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        letterSpacing: 2,
                      ),
                ),
                const Gap(10),
                Text(
                  'Play. Compete. Conquer.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white70,
                      ),
                ),
                const Gap(60),
                _LoginButton(
                  icon: LucideIcons.mail,
                  label: 'Continue with Email',
                  onTap: () => context.go('/dashboard'),
                  color: Colors.white,
                  textColor: Colors.black,
                ),
                const Gap(16),
                _LoginButton(
                  icon: LucideIcons.chrome,
                  label: 'Continue with Google',
                  onTap: () => context.go('/dashboard'),
                  color: Colors.white,
                  textColor: Colors.black,
                ),
                const Gap(16),
                _LoginButton(
                  icon: LucideIcons.user,
                  label: 'Play as Guest',
                  onTap: () => context.go('/dashboard'),
                  color: Colors.white.withValues(alpha: 0.1),
                  textColor: Colors.white,
                  isOutlined: true,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _LoginButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color color;
  final Color textColor;
  final bool isOutlined;

  const _LoginButton({
    required this.icon,
    required this.label,
    required this.onTap,
    required this.color,
    required this.textColor,
    this.isOutlined = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: isOutlined
          ? OutlinedButton.icon(
              onPressed: onTap,
              icon: Icon(icon, color: textColor),
              label: Text(label, style: TextStyle(color: textColor)),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.white.withValues(alpha: 0.5)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            )
          : ElevatedButton.icon(
              onPressed: onTap,
              icon: Icon(icon, color: textColor),
              label: Text(label, style: TextStyle(color: textColor)),
              style: ElevatedButton.styleFrom(
                backgroundColor: color,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
    );
  }
}
