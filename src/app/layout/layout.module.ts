import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { ClassyLayoutModule } from 'app/layout/layouts/classy/classy.module';
import { SharedModule } from 'app/shared/shared.module';

const layoutModules = [EmptyLayoutModule, ClassyLayoutModule];

@NgModule({
	declarations: [LayoutComponent],
	imports: [SharedModule, ...layoutModules],
	exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
