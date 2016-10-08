import {task, watch} from 'gulp';
import {sassBuildTask} from '../task_helpers';
import {SOURCE_ROOT} from '../constants';
import {join} from 'path';


task('build:scss', sassBuildTask('css', join(SOURCE_ROOT, 'scss')));