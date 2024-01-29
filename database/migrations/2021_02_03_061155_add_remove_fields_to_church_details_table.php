<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRemoveFieldsToChurchDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('church_details', function (Blueprint $table) {
            $table->dropColumn(['address', 'longitude', 'latitude']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('church_details', function (Blueprint $table) {
            $table->string('address');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
        });
    }
}
