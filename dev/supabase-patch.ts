import { execFileSync } from 'child_process';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

const yarnUnpluggedDir = path.join(process.cwd(), '.yarn', 'unplugged');

(async () => {
    const dirs = await fs.readdir(yarnUnpluggedDir, { withFileTypes: true });
    let installedSupabase = null;
    for (const dir of dirs) {
        if (!/^supabase\-npm/.test(dir.name) || !dir.isDirectory()) continue;
        installedSupabase = dir.name;
    }
    if (!installedSupabase) {
        console.log('Could not find supabase dep in unplugged dir');
        return;
    }
    const pathToSupabaseExe = path.join(
        yarnUnpluggedDir,
        installedSupabase,
        'node_modules',
        'supabase',
        'bin',
        process.platform === 'win32' ? 'supabase.exe' : 'supabase',
    );
    if (!fsSync.existsSync(pathToSupabaseExe)) {
        console.log('Could not find supabase executable in unplugged dir');
        return;
    }
    const args = process.argv.slice(2);

    try {
        execFileSync(pathToSupabaseExe, args, { stdio: 'inherit' });
    } catch (err: any) {
        process.exit(err.status ?? 1);
    }
})();
